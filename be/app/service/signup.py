from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.password_hash import hash_password
from app.config.config import settings
from app.models.users import User
from app.schemas.signup import SignupRequest


class SignupConflictError(Exception):
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


async def _phone_taken(session: AsyncSession, phonenum: str) -> bool:
    q = await session.execute(select(User.id).where(User.phonenum == phonenum).limit(1))
    return q.scalar_one_or_none() is not None


async def _email_taken(session: AsyncSession, email: str) -> bool:
    q = await session.execute(select(User.id).where(User.email == email).limit(1))
    return q.scalar_one_or_none() is not None


async def register_user(session: AsyncSession, data: SignupRequest) -> User:
    if await _phone_taken(session, data.phonenum):
        raise SignupConflictError('Phone number already registered')
    if data.email and await _email_taken(session, data.email):
        raise SignupConflictError('Email already registered')

    active = (
        settings.AUTH_SIGNUP_ACTIVE_DEFAULT
        if data.active is None
        else data.active
    )

    user = User(
        phonenum=data.phonenum,
        email=data.email,
        password=hash_password(data.password),
        name=data.name,
        address=data.address,
        city=data.city,
        country=data.country,
        deviceid=data.deviceid,
        role=data.role,
        active=active,
        verified=data.verified,
        archive=data.archive,
        supervisor=data.supervisor,
        token=data.token,
        tags=data.tags,
        more=dict(data.more),
    )
    session.add(user)
    try:
        await session.flush()
    except IntegrityError as e:
        await session.rollback()
        raise SignupConflictError('Phone or email already registered') from e
    return user
