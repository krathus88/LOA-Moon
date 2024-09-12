from ninja import Schema
from typing import Any, Dict, List, Optional
from pydantic import Field


class EncounterDamageStatsType(Schema):
    appliedShieldBuffs: dict
    bossHpLog: Dict[str, List[dict]]
    buffs: Dict[int, dict]
    debuffs: Dict[int, dict]
    dps: int
    misc: dict
    mostDamageTakenEntity: dict
    topDamageDealt: int
    topDamageTaken: int
    totalDamageDealt: int
    totalDamageTaken: int
    totalEffectiveShielding: int
    totalShielding: int


class EntitiesType(Schema):
    characterId: int
    class_: str = Field(..., alias="class")
    classId: int
    currentHp: int
    currentShield: int
    engravingData: Any
    entityType: str
    gearHash: Any
    gearScore: float
    id: int
    isDead: bool
    maxHp: int
    name: str
    npcId: int
    damageStats: dict
    skillStats: dict
    skills: Dict[int, dict]


class UploadLogBody(Schema):
    localId: int
    lastCombatPacket: int
    bossOnlyDamage: bool
    cleared: bool
    currentBoss: Any
    currentBossName: str
    difficulty: str
    duration: int
    favorite: bool
    fightStart: int
    localPlayer: str
    encounterDamageStats: EncounterDamageStatsType
    entities: Dict[str, EntitiesType]
    sync: Any
