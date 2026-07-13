# app/main.py

from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.service.service import init_db, close_db
from app.routes.v1 import health, outlets, projects, uplaod
from app.routes import auth as auth_routes
from app.config.config import settings
from app.db.schema import create_tables_from_models
from app.auth import start_auth_sessions, stop_auth_sessions

prefix = "/api/v1"

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    router = await init_db(
        master_url=settings.DB_PROD_URL,
        replica_urls=getattr(settings, 'DB_REPLICA_URLS', [])
    )
    if settings.DB_AUTO_CREATE_SCHEMA and router.master.engine:
        await create_tables_from_models(router.master.engine)
    await start_auth_sessions()
    print("✅ Database connected")
    yield
    # Shutdown
    await stop_auth_sessions()
    await close_db()
    print("✅ Database disconnected")


# Create FastAPI app
app = FastAPI(
    title="Spirix Analytics API",
    version="1.0.0",
    lifespan=lifespan,
    description=(
        "Session auth: call `POST /api/auth/signin`, then send the token using "
        "**Authorize → HTTPBearer**, or **X-Auth-Token**, or **auth** "
        "(use the raw token; a mistaken `Bearer ` prefix on X-Auth-Token is stripped). "
        "If one header is wrong, another may still authenticate."
    ),
    swagger_ui_parameters={"persistAuthorization": True},
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(health.router, prefix=prefix)
app.include_router(projects.router, prefix=prefix)
app.include_router(outlets.router, prefix=prefix)
app.include_router(uplaod.router, prefix=prefix)
app.include_router(auth_routes.router, prefix='/api/auth')


@app.get("/")
async def root():
    return {"message": "Spirix Analytics API", "version": "1.0.0"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8088,
        workers=1,
        loop="asyncio",
        reload=False  # Set to True for development only
    )
