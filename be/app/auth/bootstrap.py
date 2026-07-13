from app.auth.session_store import (
    MemorySessionStore,
    init_session_store,
    shutdown_session_store,
)
from app.config.config import settings


async def start_auth_sessions() -> None:
    await init_session_store(MemorySessionStore(settings.AUTH_SESSION_TTL_MINUTES))


async def stop_auth_sessions() -> None:
    await shutdown_session_store()
