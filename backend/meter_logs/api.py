import os

from ninja import Router, File
from ninja.files import UploadedFile
from django.conf import settings
from django.db import IntegrityError
from django.http import HttpResponse
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt

from authentication.services import TokenAuth
from encounter.models import Encounter, EncounterPlayers
from .services import parse_db_file, format_db_data, associate_characters_with_user


router = Router()


@router.post("/", auth=TokenAuth())
@csrf_exempt
def upload_log(request, file: UploadedFile = File(...)):
    profile = request.auth

    # Save the uploaded file temporarily
    file_path = os.path.join(settings.MEDIA_ROOT, file.name)
    with open(file_path, "wb+") as f:
        for chunk in file.chunks():
            f.write(chunk)

    # Parse the .db file
    data = parse_db_file(file_path)

    # Clean up: remove the temporary file
    os.remove(file_path)

    (
        parsed_encounter_preview_data,
        parsed_encounter_preview_player_data,
        local_player_names,
    ) = format_db_data(data)

    # Associate characters with the user
    associate_characters_with_user(profile, local_player_names)

    for i, entry in enumerate(parsed_encounter_preview_data):
        fight_end_time = entry["fight_end"]
        time_range_start = fight_end_time - 30  # seconds before
        time_range_end = fight_end_time + 30  # seconds after

        # Find potential matches within the time range
        potential_matches = Encounter.objects.filter(
            Q(fight_end__gte=time_range_start) & Q(fight_end__lte=time_range_end),
            boss_name=entry["boss_name"],
            difficulty=entry["difficulty"],
            npc_id=entry["npc_id"],
        )

        match_found = False

        # Check each potential match to see if it has the same players
        for match in potential_matches:
            existing_players = set(match.players.values_list("character_id", flat=True))
            new_players = set(
                player["character_id"]
                for player in parsed_encounter_preview_player_data[i]
            )

            # If the players match (considering some overlap), skip this encounter
            if existing_players == new_players:
                match_found = True
                break

        if match_found:
            # Skip this encounter as it already exists with the same players
            continue

        try:
            encounter = Encounter.objects.create(
                fight_end=entry["fight_end"],
                fight_duration=entry["fight_duration"],
                boss_name=entry["boss_name"],
                difficulty=entry["difficulty"],
                max_hp=entry["max_hp"],
                max_hp_bars=entry["max_hp_bars"],
                npc_id=entry["npc_id"],
            )
        except IntegrityError:
            # Handle the exception if needed
            raise HttpResponse(f"Error saving encounter preview.", status=500)

        # Process EncounterPlayers data for the corresponding encounter
        for player_entry in parsed_encounter_preview_player_data[i]:
            try:
                EncounterPlayers.objects.create(
                    encounter=encounter,
                    name=player_entry["name"],
                    character_id=player_entry["character_id"],
                    class_id=player_entry["class_id"],
                    subclass=player_entry["subclass"],
                    dps=player_entry["dps"],
                    gear_score=player_entry["gear_score"],
                    is_dead=player_entry["is_dead"],
                    party_num=player_entry["party_num"],
                )
            except IntegrityError:
                return HttpResponse(
                    f"Error saving encounter preview player.", status=500
                )

    return {"status": "success", "message": "Data processed and saved."}
