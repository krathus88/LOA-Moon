import os

from ninja import Router, File
from ninja.files import UploadedFile
from django.conf import settings

from .services import parse_db_file


router = Router()


@router.post("/log")
def upload_db(request, file: UploadedFile = File(...)):
    # Save the uploaded file temporarily
    file_path = os.path.join(settings.MEDIA_ROOT, file.name)
    with open(file_path, "wb+") as f:
        for chunk in file.chunks():
            f.write(chunk)

    # Parse the .db file
    parse_db_file(file_path)

    # Clean up: remove the temporary file
    os.remove(file_path)

    return {"success": True}
