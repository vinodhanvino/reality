# app/db/connection.py

import asyncio
from contextlib import asynccontextmanager
from typing import Optional, AsyncGenerator
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    AsyncSession,
    async_sessionmaker,
    AsyncEngine
)
from sqlalchemy import text

import logging

logger = logging.getLogger(__name__)


class AsyncDatabaseManager:
    """Manages async database connections with connection pooling"""

    def __init__(self, database_url: str, is_read_replica: bool = False):
        self.database_url = database_url.replace("postgresql://", "postgresql+asyncpg://")
        self.is_read_replica = is_read_replica
        self._engine: Optional[AsyncEngine] = None
        self._session_factory: Optional[async_sessionmaker] = None

    @property
    def engine(self) -> Optional[AsyncEngine]:
        return self._engine

    async def initialize(self) -> "AsyncDatabaseManager":
        """Initialize connection pool"""
        self._engine = create_async_engine(
            self.database_url,
            pool_size=50,
            max_overflow=30,
            pool_timeout=10,
            pool_recycle=1800,
            pool_pre_ping=True,
            echo=False,
            # --- ADD THIS SECTION ---
            connect_args={
                "prepared_statement_cache_size": 0,
                "statement_cache_size": 0,
            }
            # -------------------------
        )

        # Test connection
        async with self._engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
            await conn.commit()

        self._session_factory = async_sessionmaker(
            self._engine,
            class_=AsyncSession,
            expire_on_commit=False
        )

        logger.info(f"✅ DB initialized (replica: {self.is_read_replica})")
        return self

    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        """Get database session"""
        async with self._session_factory() as session:
            try:
                yield session
                await session.commit()
            except Exception:
                await session.rollback()
                raise
            finally:
                await session.close()

    async def close(self):
        """Dispose connection pool"""
        if self._engine:
            await self._engine.dispose()


class DatabaseRouter:
    """Routes reads to replicas, writes to master"""

    def __init__(self, master_url: str, replica_urls: list[str]):
        self.master = AsyncDatabaseManager(master_url, is_read_replica=False)
        self.replicas = [AsyncDatabaseManager(url, is_read_replica=True) for url in replica_urls]
        self._replica_index = 0

    async def initialize_all(self):
        await self.master.initialize()
        for replica in self.replicas:
            await replica.initialize()
        return self

    async def get_write_session(self) -> AsyncGenerator[AsyncSession, None]:
        async for session in self.master.get_session():
            yield session

    async def get_read_session(self) -> AsyncGenerator[AsyncSession, None]:
        if not self.replicas:
            async for session in self.master.get_session():
                yield session
        else:
            self._replica_index = (self._replica_index + 1) % len(self.replicas)
            async for session in self.replicas[self._replica_index].get_session():
                yield session

    async def close_all(self):
        await self.master.close()
        for replica in self.replicas:
            await replica.close()


# Global instance
db_router: Optional[DatabaseRouter] = None


async def init_db(master_url: str, replica_urls: list[str] = None):
    """Initialize database router (call at startup)"""
    global db_router
    db_router = await DatabaseRouter(master_url, replica_urls or []).initialize_all()
    return db_router


async def close_db():
    """Close all database connections (call at shutdown)"""
    global db_router
    if db_router:
        await db_router.close_all()

