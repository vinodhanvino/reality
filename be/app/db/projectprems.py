"""SQLAlchemy model: projectprem (project membership / permissions row)."""

from sqlalchemy import Column, ForeignKey, Integer, JSON, UniqueConstraint
from sqlalchemy.ext.mutable import MutableDict

from app.models.users import Base

class ProjectPrem(Base):
    __tablename__ = "projectprem"
    __table_args__ = (
        UniqueConstraint("project_id", "user_id", name="uq_projectprem_project_user"),
        {"extend_existing": True},
    )

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False, index=True)
    more = Column(MutableDict.as_mutable(JSON), default=dict)