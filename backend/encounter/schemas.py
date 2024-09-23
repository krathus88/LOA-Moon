from ninja import Schema
from typing import List, Dict


class EncounterPlayerDataSchema(Schema):
    total_damage: int
    casts: int
    hits: int
    crits: int
    back_attacks: int
    front_attacks: int
    counters: int
    buffs: Dict
    debuffs: Dict
    skills: Dict
    shields: Dict
    absorbs: Dict


class EncounterPlayerSchema(Schema):
    name: str
    character_id: int
    class_id: int
    subclass: str
    dps: int
    gear_score: float
    is_dead: bool
    death_timer: int
    death_count: int
    party_num: int
    display_name: bool
    player_data: EncounterPlayerDataSchema


class EncounterSchema(Schema):
    region: str
    encounter_id: int
    fight_end: int
    fight_duration: int
    boss_name: str
    difficulty: str
    max_hp: int
    npc_id: int
    players: List[EncounterPlayerSchema]
