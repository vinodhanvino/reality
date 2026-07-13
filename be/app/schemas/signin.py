from pydantic import BaseModel, Field


class SignInRequest(BaseModel):
    username: str = Field(min_length=1)
    password: str = Field(min_length=1)


class SignInSuccess(BaseModel):
    message: str = 'Login successful'
    token: str
    expires_in_minutes: int
    role: str | None = None
