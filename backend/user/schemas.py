from ninja import Schema
from typing import List


class CharactersType(Schema):
    region: str
    name: str
    class_id: int
    display_name: bool
    display_logs: bool
    markedForDeletion: bool


class UserCharacterBody(Schema):
    characters: List[CharactersType]
