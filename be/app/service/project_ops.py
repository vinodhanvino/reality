from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.projectprems import ProjectPrem
from app.db.projects import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.service import project_membership as pm


async def create_project(db: AsyncSession, user_id: int, body: ProjectCreate) -> Project:
    row = Project(
        project_name=body.project_name,
        created_by=user_id,
        description=body.description,
        more=dict(body.more),
    )
    db.add(row)
    await db.flush()
    await db.refresh(row)
    await pm.add_membership(db, row.id, user_id, more={})
    return row


async def list_projects(
    db: AsyncSession, user_id: int, *, include_archived: bool = False
) -> list[Project]:
    q = (
        select(Project)
        .join(ProjectPrem, ProjectPrem.project_id == Project.id)
        .where(ProjectPrem.user_id == user_id)
    )
    if not include_archived:
        q = q.where(Project.archived.is_(False))
    q = q.order_by(Project.created_at.desc())
    res = await db.execute(q)
    return list(res.scalars().unique().all())


async def get_project(db: AsyncSession, project_id: int, user_id: int) -> Project | None:
    q = (
        select(Project)
        .join(ProjectPrem, ProjectPrem.project_id == Project.id)
        .where(
            Project.id == project_id,
            ProjectPrem.user_id == user_id,
        )
    )
    res = await db.execute(q)
    return res.scalar_one_or_none()


async def update_project(
    db: AsyncSession, project_id: int, user_id: int, body: ProjectUpdate
) -> Project | None:
    row = await get_project(db, project_id, user_id)
    if row is None:
        return None
    data = body.model_dump(exclude_unset=True)
    if "project_name" in data:
        row.project_name = data["project_name"]
    if "description" in data:
        row.description = data["description"]
    if "more" in data:
        row.more = dict(data["more"] or {})
    if "archived" in data:
        row.archived = data["archived"]
    await db.flush()
    await db.refresh(row)
    return row
