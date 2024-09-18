from ninja import Schema
from typing import List


class CharactersType(Schema):
    region: str
    name: str
    class_id: int
    display_name: bool
    markedForDeletion: bool
    display_name_in_all_previous_logs: bool


class UserCharacterBody(Schema):
    characters: List[CharactersType]
