import bcrypt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.session_store import get_session_store
from app.models.users import User


def _password_ok(plain: str, stored: str) -> bool:
    try:
        return bcrypt.checkpw(
            plain.encode('utf-8'),
            stored.encode('utf-8'),
        )
    except (ValueError, TypeError):
        return False


async def user_by_login_id(session: AsyncSession, username: str) -> User | None:
    """Resolve login id: phonenum (unique) → email (unique) → name (ambiguous if duplicated)."""
    u = username.strip()
    if not u:
        return None
    r = await session.execute(select(User).where(User.phonenum == u))
    row = r.scalar_one_or_none()
    if row is not None:
        return row
    r = await session.execute(select(User).where(User.email == u.lower()))
    row = r.scalar_one_or_none()
    if row is not None:
        return row
    r = await session.execute(select(User).where(User.name == u).limit(2))
    names = r.scalars().all()
    if len(names) == 1:
        return names[0]
    return None


async def sign_in(session: AsyncSession, username: str, password: str) -> dict | None:
    user = await user_by_login_id(session, username.strip())
    if user is None or user.archive or not user.active:
        return None
    if not user.password or not _password_ok(password, user.password):
        return None
    store = get_session_store()
    token, mins = await store.create_session(user.id)
    return {
        'message': 'Login successful',
        'token': token,
        'expires_in_minutes': mins,
        'role': user.role,
    }
