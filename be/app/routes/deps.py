# app/routes/deps.py

from typing import Annotated, AsyncGenerator

from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, APIKeyHeader
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.types import AuthUser
from app.auth.session_store import get_session_store
from app.config.config import settings
from app.models.users import User
from app.service import service as db_service

SESSION_EXPIRED_MSG = 'Session expired. Please sign in again.'

_bearer_scheme = HTTPBearer(
    auto_error=False,
    description='Bearer token from POST /api/auth/signin.',
)
_x_auth_scheme = APIKeyHeader(
    name='X-Auth-Token',
    scheme_name='XAuthToken',
    auto_error=False,
    description='Same session token in a header (alternative to Authorization: Bearer).',
)
_auth_alias_scheme = APIKeyHeader(
    name='auth',
    scheme_name='AuthHeader',
    auto_error=False,
    description='Same session token; some clients send this header name instead.',
)


async def get_db_write() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for write operations"""
    if not db_service.db_router:
        raise HTTPException(status_code=503, detail="Database not initialized")

    async for session in db_service.db_router.get_write_session():
        yield session


async def get_db_read() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for read operations (uses replicas)"""
    if not db_service.db_router:
        raise HTTPException(status_code=503, detail="Database not initialized")

    async for session in db_service.db_router.get_read_session():
        yield session


async def require_api_key(api_key: str = Depends(lambda: None)):
    return True


def _bearer_token(authorization: str | None) -> str | None:
    if not authorization:
        return None
    parts = authorization.split(None, 1)
    if len(parts) == 2 and parts[0].lower() == 'bearer':
        t = parts[1].strip()
        return t or None
    if len(parts) == 1 and parts[0].strip():
        return parts[0].strip()
    return None


def _normalize_token_value(raw: str | None) -> str | None:
    """Strip whitespace and a single mistaken ``Bearer `` prefix (e.g. on X-Auth-Token)."""
    if not raw:
        return None
    s = raw.strip()
    if not s:
        return None
    if len(s) >= 7 and s[:7].lower() == 'bearer ':
        s = s[7:].strip()
    return s or None


def _session_token_candidates(
    bearer: HTTPAuthorizationCredentials | None,
    x_auth_token: str | None,
    auth_raw: str | None,
    authorization_header: str | None,
) -> list[str]:
    """Ordered, de-duplicated candidates; prefer explicit headers over Authorization."""
    pieces: list[str | None] = [
        x_auth_token,
        auth_raw,
        bearer.credentials if bearer is not None else None,
        _bearer_token(authorization_header),
    ]
    seen: set[str] = set()
    out: list[str] = []
    for p in pieces:
        n = _normalize_token_value(p) if p else None
        if n and n not in seen:
            seen.add(n)
            out.append(n)
    return out


async def verify_token(
    request: Request,
    bearer: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer_scheme)],
    x_auth_token: Annotated[str | None, Depends(_x_auth_scheme)],
    auth_raw: Annotated[str | None, Depends(_auth_alias_scheme)],
) -> AuthUser:
    auth_header = request.headers.get('authorization')
    candidates = _session_token_candidates(
        bearer, x_auth_token, auth_raw, auth_header
    )
    if not candidates:
        raise HTTPException(status_code=401, detail=SESSION_EXPIRED_MSG)
    try:
        store = get_session_store()
    except RuntimeError:
        raise HTTPException(status_code=503, detail='Session store unavailable')
    for token in candidates:
        uid = await store.validate_token(token)
        if uid is not None:
            return AuthUser(id=uid)
    raise HTTPException(status_code=401, detail=SESSION_EXPIRED_MSG)


async def require_auditor(
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_read)],
) -> AuthUser:
    r = await db.execute(select(User.role).where(User.id == auth.id))
    role = r.scalar_one_or_none()
    if role != settings.ROLE_AUDITOR:
        raise HTTPException(status_code=403, detail="Auditor role required")
    return auth


verifyToken = verify_token
