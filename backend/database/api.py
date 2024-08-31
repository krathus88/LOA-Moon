import os

from ninja import Router, File
from ninja.files import UploadedFile
from django.conf import settings
from django.db import IntegrityError
from django.http import HttpResponse

from .services import parse_db_file, format_db_data
from .models import EncounterPreview


router = Router()


@router.post("/log")
def upload_db(request, file: UploadedFile = File(...)):
    # Save the uploaded file temporarily
    file_path = os.path.join(settings.MEDIA_ROOT, file.name)
    with open(file_path, "wb+") as f:
        for chunk in file.chunks():
            f.write(chunk)

    # Parse the .db file
    data = parse_db_file(file_path)

    # Clean up: remove the temporary file
    os.remove(file_path)

    parsed_encounter_preview_data = format_db_data(data)

    for entry in parsed_encounter_preview_data:
        try:
            EncounterPreview.objects.create(
                encounter_id=entry["encounter_id"],
                fight_end=entry["fight_end"],
                fight_duration=entry["fight_duration"],
                local_player=entry["local_player"],
                boss_name=entry["boss_name"],
                difficulty=entry["difficulty"],
                max_hp=entry["max_hp"],
                npc_id=entry["npc_id"],
                player_data=entry["player_data"],
            )
        except IntegrityError as e:
            # Handle the exception if needed
            raise HttpResponse(f"Error saving encounter preview.", status=500)

    return {"status": "success", "message": "Data processed and saved."}
