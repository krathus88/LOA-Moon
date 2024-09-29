from ninja import Router
from django.db import IntegrityError
from django.http import HttpResponse
from django.db import transaction
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt

from authentication.services import TokenAuth
from encounter.models import Encounter, EncounterPlayers, EncounterPlayerData
from .services import decompress_data, format_db_data, associate_characters_with_user


router = Router()


@router.post("/", auth=TokenAuth())
@csrf_exempt
def upload_log(request):
    data = decompress_data(request)

    profile = request.auth

    (
        parsed_encounter_preview_data,
        parsed_encounter_preview_player_data,
        local_player_names,
        encounters_info,
    ) = format_db_data(data)

    # Associate characters with the user
    associate_characters_with_user(profile, local_player_names)

    for i, entry in enumerate(parsed_encounter_preview_data):
        fight_end_time = entry["fight_end"]

        time_range_start = fight_end_time - 300  # seconds before
        time_range_end = fight_end_time + 300  # seconds after

        with transaction.atomic():
            # Find potential matches within the time range
            potential_matches = Encounter.objects.filter(
                Q(fight_end__gte=time_range_start) & Q(fight_end__lte=time_range_end),
                region=entry["region"],
                boss_name=entry["boss_name"],
                difficulty=entry["difficulty"],
            ).select_for_update()

            match_found = False
            # Check each potential match to see if it has the same players
            for match in potential_matches:
                existing_players = set(
                    match.players.values_list("character_id", flat=True)
                )
                new_players = set(
                    player["character_id"]
                    for player in parsed_encounter_preview_player_data[i]
                )

                # If the players match (considering some overlap), skip this encounter
                if existing_players == new_players:
                    match_found = True
                    break

            # Skip this encounter as it already exists with the same players
            if match_found:
                encounters_info[entry["local_id"]]["success"] = True
                encounters_info[entry["local_id"]]["is_valid"] = True
                encounters_info[entry["local_id"]]["id"] = match.id
                continue

            try:
                encounter = Encounter.objects.create(
                    region=entry["region"],
                    fight_end=entry["fight_end"],
                    fight_duration=entry["fight_duration"],
                    boss_name=entry["boss_name"],
                    difficulty=entry["difficulty"],
                    max_hp=entry["max_hp"],
                    npc_id=entry["npc_id"],
                )

                # Process EncounterPlayers data for the corresponding encounter
                for player_entry in parsed_encounter_preview_player_data[i]:
                    encounter_player = EncounterPlayers.objects.create(
                        encounter=encounter,
                        name=player_entry["name"],
                        character_id=player_entry["character_id"],
                        class_id=player_entry["class_id"],
                        subclass=player_entry["subclass"],
                        dps=player_entry["dps"],
                        gear_score=player_entry["gear_score"],
                        is_dead=player_entry["is_dead"],
                        death_timer=player_entry["death_timer"],
                        death_count=player_entry["death_count"],
                        party_num=player_entry["party_num"],
                        display_name=player_entry["display_name"],
                    )

                    EncounterPlayerData.objects.create(
                        player=encounter_player,
                        counters=player_entry["counters"],
                        casts=player_entry["casts"],
                        hits=player_entry["hits"],
                        crits=player_entry["crits"],
                        dmg_total=player_entry["dmg_total"],
                        dmg_back_attacks=player_entry["dmg_back_attacks"],
                        dmg_front_attacks=player_entry["dmg_front_attacks"],
                        dmg_debuffed_supp_brand=player_entry["dmg_debuffed_supp_brand"],
                        dmg_buffed_supp_ap=player_entry["dmg_buffed_supp_ap"],
                        dmg_buffed_supp_identity=player_entry[
                            "dmg_buffed_supp_identity"
                        ],
                        buffs=player_entry["buffs"],
                        debuffs=player_entry["debuffs"],
                        skills=player_entry["skills"],
                    )

                encounters_info[entry["local_id"]]["success"] = True
                encounters_info[entry["local_id"]]["is_valid"] = True
                encounters_info[entry["local_id"]]["id"] = encounter.id
            except IntegrityError:
                continue

    return {
        "status": "success",
        "message": "Data processed and saved.",
        "encounters_info": encounters_info,
    }
