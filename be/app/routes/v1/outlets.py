from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.types import AuthUser
from app.routes.deps import get_db_read, get_db_write, verify_token
from app.schemas.outlet import OutletCreate, OutletOut, OutletUpdate
from app.service import outlet_ops

router = APIRouter(prefix="/projects/{project_id}/outlets", tags=["outlets"])


@router.post("", status_code=status.HTTP_201_CREATED, response_model=OutletOut)
async def create_outlet(
    project_id: int,
    body: OutletCreate,
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_write)],
):
    row = await outlet_ops.create_outlet(db, project_id, auth.id, body)
    if row is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return row


@router.get("", response_model=list[OutletOut])
async def list_outlets(
    project_id: int,
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_read)],
    include_archived: bool = Query(False),
):
    rows = await outlet_ops.list_outlets(
        db, project_id, auth.id, include_archived=include_archived
    )
    if rows is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return rows


@router.get("/{outlet_id}", response_model=OutletOut)
async def get_outlet(
    project_id: int,
    outlet_id: int,
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_read)],
):
    row = await outlet_ops.get_outlet(db, project_id, outlet_id, auth.id)
    if row is None:
        raise HTTPException(status_code=404, detail="Outlet or project not found")
    return row


@router.patch("/{outlet_id}", response_model=OutletOut)
async def patch_outlet(
    project_id: int,
    outlet_id: int,
    body: OutletUpdate,
    auth: Annotated[AuthUser, Depends(verify_token)],
    db: Annotated[AsyncSession, Depends(get_db_write)],
):
    row = await outlet_ops.update_outlet(db, project_id, outlet_id, auth.id, body)
    if row is None:
        raise HTTPException(status_code=404, detail="Outlet or project not found")
    return row
