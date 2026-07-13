"""SQLAlchemy model: physical closing."""

from datetime import datetime, timezone

from sqlalchemy import JSON, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.mutable import MutableDict

from app.models.users import Base


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


class PhysicalClosing(Base):
    __tablename__ = "physical_closing"
    __table_args__ = ({"extend_existing": True},)

    id = Column(Integer, primary_key=True)
    item_name = Column(String, nullable=False, index=True)
    receipt_uom = Column(Integer, nullable=False, default=0)
    sale_uom = Column(Integer, nullable=False, default=0)
    category = Column(Integer, nullable=False, default=0)
    closing_qty = Column(MutableDict.as_mutable(JSON), nullable=False, default=dict)
    mrp_value = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), nullable=False, default=_utc_now)
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=_utc_now,
        onupdate=_utc_now,
    )
    created_by = Column(Integer, ForeignKey("user.id"), nullable=False, index=True)
    updated_by = Column(Integer, ForeignKey("user.id"), nullable=True, index=True)
    more = Column(MutableDict.as_mutable(JSON), nullable=False, default=dict)




