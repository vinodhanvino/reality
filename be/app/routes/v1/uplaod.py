from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from app.processor.excel.pshyical_closing import process_uploaded_excel
router = APIRouter(prefix="/upload", tags=["Uploading"])


@router.post("/excel")
async def upload_file(background_tasks: BackgroundTasks,
                      file: UploadFile = File(...)):
    contents = await file.read()
    result = process_uploaded_excel(contents)
    return result
