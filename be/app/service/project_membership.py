"""Project membership rows (projectprem) and access checks."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.projectprems import ProjectPrem
from app.db.projects import Project
from app.models.users import User


async def add_membership(
    db: AsyncSession,
    project_id: int,
    user_id: int,
    *,
    more: dict | None = None,
) -> ProjectPrem:
    row = ProjectPrem(
        project_id=project_id,
        user_id=user_id,
        more=dict(more or {}),
    )
    db.add(row)
    await db.flush()
    await db.refresh(row)
    return row


async def user_has_project_access(
    db: AsyncSession, project_id: int, user_id: int
) -> bool:
    q = (
        select(ProjectPrem.id)
        .where(
            ProjectPrem.project_id == project_id,
            ProjectPrem.user_id == user_id,
        )
        .limit(1)
    )
    r = await db.execute(q)
    return r.scalar_one_or_none() is not None


async def user_exists(db: AsyncSession, user_id: int) -> bool:
    q = select(User.id).where(User.id == user_id).limit(1)
    r = await db.execute(q)
    return r.scalar_one_or_none() is not None


async def project_exists(db: AsyncSession, project_id: int) -> bool:
    q = select(Project.id).where(Project.id == project_id).limit(1)
    r = await db.execute(q)
    return r.scalar_one_or_none() is not None


async def assign_user_to_project(
    db: AsyncSession, project_id: int, target_user_id: int
) -> tuple[ProjectPrem | None, bool, str | None]:
    """
    Returns (prem_row, created, err).
    err is 'missing_project' | 'missing_user' | None.
    """
    if not await project_exists(db, project_id):
        return None, False, "missing_project"
    if not await user_exists(db, target_user_id):
        return None, False, "missing_user"
    prem, created = await add_member_if_absent(db, project_id, target_user_id)
    return prem, created, None


async def get_membership(
    db: AsyncSession, project_id: int, user_id: int
) -> ProjectPrem | None:
    q = select(ProjectPrem).where(
        ProjectPrem.project_id == project_id,
        ProjectPrem.user_id == user_id,
    )
    r = await db.execute(q)
    return r.scalar_one_or_none()


async def add_member_if_absent(
    db: AsyncSession, project_id: int, target_user_id: int
) -> tuple[ProjectPrem, bool]:
    """Returns (row, created). Raises nothing; caller validates project/user."""
    existing = await get_membership(db, project_id, target_user_id)
    if existing is not None:
        return existing, False
    row = await add_membership(db, project_id, target_user_id)
    return row, True
