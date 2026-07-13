from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.config.config import settings


class OutletCreate(BaseModel):
    outlet_name: str = Field(min_length=1, max_length=settings.OUTLET_NAME_MAX_LENGTH)
    description: str | None = Field(
        default=None, max_length=settings.OUTLET_DESCRIPTION_MAX_LENGTH
    )
    more: dict[str, Any] = Field(default_factory=dict)

    @field_validator("outlet_name", mode="after")
    @classmethod
    def strip_name(cls, v: str) -> str:
        s = v.strip()
        if not s:
            raise ValueError("outlet_name cannot be blank")
        return s


class OutletUpdate(BaseModel):
    outlet_name: str | None = Field(
        default=None, max_length=settings.OUTLET_NAME_MAX_LENGTH
    )
    description: str | None = Field(
        default=None, max_length=settings.OUTLET_DESCRIPTION_MAX_LENGTH
    )
    more: dict[str, Any] | None = None
    archived: bool | None = None

    @field_validator("outlet_name", mode="after")
    @classmethod
    def strip_name(cls, v: str | None) -> str | None:
        if v is None:
            return None
        s = v.strip()
        if not s:
            raise ValueError("outlet_name cannot be blank")
        return s


class OutletOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    outlet_name: str
    description: str | None
    project_id: int
    created_by: int
    created_at: datetime
    modified_at: datetime
    archived: bool
    more: dict[str, Any]
