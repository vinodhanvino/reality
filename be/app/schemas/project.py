from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.config.config import settings


class ProjectCreate(BaseModel):
    project_name: str = Field(min_length=1, max_length=settings.PROJECT_NAME_MAX_LENGTH)
    description: str | None = Field(default=None, max_length=settings.PROJECT_DESCRIPTION_MAX_LENGTH)
    more: dict[str, Any] = Field(default_factory=dict)

    @field_validator('project_name', mode='after')
    @classmethod
    def strip_name(cls, v: str) -> str:
        s = v.strip()
        if not s:
            raise ValueError('project_name cannot be blank')
        return s


class ProjectUpdate(BaseModel):
    project_name: str | None = Field(default=None, max_length=settings.PROJECT_NAME_MAX_LENGTH)
    description: str | None = Field(default=None, max_length=settings.PROJECT_DESCRIPTION_MAX_LENGTH)
    more: dict[str, Any] | None = None
    archived: bool | None = None

    @field_validator('project_name', mode='after')
    @classmethod
    def strip_name(cls, v: str | None) -> str | None:
        if v is None:
            return None
        s = v.strip()
        if not s:
            raise ValueError('project_name cannot be blank')
        return s


class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_name: str
    created_by: int
    description: str | None
    created_at: datetime
    modified_at: datetime
    archived: bool
    more: dict[str, Any]


class ProjectMemberAssign(BaseModel):
    user_id: int = Field(gt=0)


class ProjectMemberAssignOut(BaseModel):
    project_id: int
    user_id: int
    created: bool
