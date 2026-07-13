from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.types import AuthUser
from app.routes.deps import get_db_read, get_db_write, require_auditor, verify_token
from app.schemas.project import (
    ProjectCreate,
    ProjectMemberAssign,
    ProjectMemberAssignOut,
    ProjectOut,
    ProjectUpdate,
)
from app.service import project_membership
from app.service import project_ops

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("", status_code=status.HTTP_201_CREATED, response_model=ProjectOut)
async def create_project(
    body: ProjectCreate,
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_write)],
):
    row = await project_ops.create_project(db, auth.id, body)
    return row


@router.get("", response_model=list[ProjectOut])
async def list_projects(
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_read)],
    include_archived: bool = Query(False),
):
    return await project_ops.list_projects(db, auth.id, include_archived=include_archived)


@router.get("/{project_id}", response_model=ProjectOut)
async def get_project(
    project_id: int,
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_read)],
):
    row = await project_ops.get_project(db, project_id, auth.id)
    if row is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return row


@router.patch("/{project_id}", response_model=ProjectOut)
async def patch_project(
    project_id: int,
    body: ProjectUpdate,
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_write)],
):
    row = await project_ops.update_project(db, project_id, auth.id, body)
    if row is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return row


@router.post(
    "/{project_id}/members",
    response_model=ProjectMemberAssignOut,
)
async def assign_project_member(
    project_id: int,
    body: ProjectMemberAssign,
    _auditor: Annotated[AuthUser, Depends(require_auditor)],
    db: Annotated[AsyncSession, Depends(get_db_write)],
    response: Response,
):
    prem, created, err = await project_membership.assign_user_to_project(
        db, project_id, body.user_id
    )
    if err == "missing_project":
        raise HTTPException(status_code=404, detail="Project not found")
    if err == "missing_user":
        raise HTTPException(status_code=404, detail="User not found")
    response.status_code = (
        status.HTTP_201_CREATED if created else status.HTTP_200_OK
    )
    return ProjectMemberAssignOut(
        project_id=project_id,
        user_id=prem.user_id,
        created=created,
    )
