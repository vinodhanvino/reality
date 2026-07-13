from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.routes.deps import get_db_read, get_db_write
from app.schemas.signin import SignInRequest, SignInSuccess
from app.schemas.signup import SignupRequest, SignupResponse
from app.service.signin import sign_in
from app.service.signup import SignupConflictError, register_user

router = APIRouter(tags=['auth'])


@router.post('/signup', status_code=status.HTTP_201_CREATED)
async def post_signup(
    body: SignupRequest,
    db: AsyncSession = Depends(get_db_write),
):
    try:
        user = await register_user(db, body)
    except SignupConflictError as e:
        return JSONResponse(
            status_code=409,
            content={'error': e.message},
        )
    return SignupResponse(user_id=user.id)


@router.post('/signin')
async def post_signin(
    body: SignInRequest,
    db: AsyncSession = Depends(get_db_read),
):
    out = await sign_in(db, body.username, body.password)
    if out is None:
        return JSONResponse(
            status_code=401,
            content={'error': 'Invalid username or password'},
        )
    return SignInSuccess(**out)
