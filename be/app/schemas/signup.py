from pydantic import BaseModel, Field, field_validator, model_validator

from app.config.config import settings


class SignupRequest(BaseModel):
    phonenum: str = Field(min_length=1)
    password: str = Field(min_length=1)
    email: str | None = None
    name: str | None = None
    address: str | None = None
    city: str | None = None
    country: str | None = None
    deviceid: str | None = None
    role: str | None = None
    active: bool | None = None
    verified: bool = False
    archive: bool = False
    supervisor: bool = False
    token: str | None = None
    tags: str = ''
    more: dict = Field(default_factory=dict)

    @model_validator(mode='before')
    @classmethod
    def strip_strings(cls, data):
        if not isinstance(data, dict):
            return data
        out = dict(data)
        for key, val in list(out.items()):
            if key == 'password' or key == 'more':
                continue
            if isinstance(val, str):
                s = val.strip()
                if key == 'tags':
                    out[key] = s
                elif key == 'phonenum':
                    out[key] = s
                else:
                    out[key] = s or None
        return out

    @field_validator('email', mode='after')
    @classmethod
    def email_lower(cls, v: str | None) -> str | None:
        return v.lower() if v else None

    @field_validator('password')
    @classmethod
    def password_len(cls, v: str) -> str:
        n = settings.AUTH_SIGNUP_PASSWORD_MIN_LENGTH
        if len(v) < n:
            raise ValueError(f'password must be at least {n} characters')
        return v


class SignupResponse(BaseModel):
    message: str = 'Registration successful'
    user_id: int
