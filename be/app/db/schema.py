"""DDL on master: create missing tables only (no data loss)."""

from sqlalchemy.ext.asyncio import AsyncEngine


async def create_tables_from_models(engine: AsyncEngine) -> None:
    from app.db import outlet as _outlet  # noqa: F401 — register mappers
    from app.db import projectprems as _projectprems  # noqa: F401 — register mappers
    from app.db import projects as _projects  # noqa: F401 — register mappers
    from app.models import users as _users  # noqa: F401 — register mappers
    from app.models.users import Base

    def _create_all(sync_conn) -> None:
        Base.metadata.create_all(sync_conn, checkfirst=True)

    async with engine.begin() as conn:
        await conn.run_sync(_create_all)
