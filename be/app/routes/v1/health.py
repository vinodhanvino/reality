# app/routes/v1/health.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.routes.deps import get_db_read
from app.service import service as db_service

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("/")
async def health_check():
    """Basic health check"""
    return {"status": "alive", "service": "spirix-api"}


@router.get("/db")
async def db_health(db: AsyncSession = Depends(get_db_read)):
    """Database health check"""
    try:
        # Use scalar() for a simple health check to minimize overhead
        await db.execute(text("SELECT 1"))

        # We DO NOT need to commit for a SELECT 1.
        # Committing can sometimes trigger 503s in pooled environments
        # if the connection is dropped mid-transaction.

        pool_status = {}
        if db_service.db_router:
            r = db_service.db_router
            master_pool = (
                r.master.get_pool_status()
                if hasattr(r.master, "get_pool_status")
                else "N/A"
            )
            pool_status = {
                "master_connections": master_pool,
                "replica_count": len(r.replicas),
            }

        return {
            "status": "healthy",
            "database": "connected",
            "pool": pool_status
        }
    except Exception as e:
        # Log the actual error to your console so you can see it in PyCharm
        print(f"CRITICAL: Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "error": "Database connection failed",
            "details": str(e)
        }

