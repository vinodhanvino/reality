"""SQLAlchemy model: projects."""

from datetime import datetime, timezone

from sqlalchemy import JSON, Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.mutable import MutableDict

from app.models.users import Base


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


class Project(Base):
    __tablename__ = "projects"
    __table_args__ = ({"extend_existing": True},)

    id = Column(Integer, primary_key=True)
    project_name = Column(String, nullable=False, index=True)
    created_by = Column(Integer, ForeignKey("user.id"), nullable=False, index=True)
    description = Column(String, nullable=True, default=None)
    created_at = Column(DateTime(timezone=True), nullable=False, default=_utc_now)
    modified_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=_utc_now,
        onupdate=_utc_now,
    )
    archived = Column(Boolean, nullable=False, default=False)
    more = Column(MutableDict.as_mutable(JSON), default=dict)
