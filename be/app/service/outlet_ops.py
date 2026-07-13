from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.outlet import Outlet
from app.schemas.outlet import OutletCreate, OutletUpdate
from app.service import project_ops


async def list_outlets(
    db: AsyncSession,
    project_id: int,
    user_id: int,
    *,
    include_archived: bool = False,
) -> list[Outlet] | None:
    proj = await project_ops.get_project(db, project_id, user_id)
    if proj is None:
        return None
    q = select(Outlet).where(Outlet.project_id == project_id)
    if not include_archived:
        q = q.where(Outlet.archived.is_(False))
    q = q.order_by(Outlet.created_at.desc())
    res = await db.execute(q)
    return list(res.scalars().all())


async def get_outlet(
    db: AsyncSession, project_id: int, outlet_id: int, user_id: int
) -> Outlet | None:
    proj = await project_ops.get_project(db, project_id, user_id)
    if proj is None:
        return None
    q = select(Outlet).where(
        Outlet.id == outlet_id,
        Outlet.project_id == project_id,
    )
    res = await db.execute(q)
    return res.scalar_one_or_none()


async def create_outlet(
    db: AsyncSession, project_id: int, user_id: int, body: OutletCreate
) -> Outlet | None:
    proj = await project_ops.get_project(db, project_id, user_id)
    if proj is None:
        return None
    row = Outlet(
        outlet_name=body.outlet_name,
        description=body.description,
        project_id=project_id,
        created_by=user_id,
        more=dict(body.more),
    )
    db.add(row)
    await db.flush()
    await db.refresh(row)
    return row


async def update_outlet(
    db: AsyncSession,
    project_id: int,
    outlet_id: int,
    user_id: int,
    body: OutletUpdate,
) -> Outlet | None:
    row = await get_outlet(db, project_id, outlet_id, user_id)
    if row is None:
        return None
    data = body.model_dump(exclude_unset=True)
    if "outlet_name" in data:
        row.outlet_name = data["outlet_name"]
    if "description" in data:
        row.description = data["description"]
    if "more" in data:
        row.more = dict(data["more"] or {})
    if "archived" in data:
        row.archived = data["archived"]
    await db.flush()
    await db.refresh(row)
    return row
