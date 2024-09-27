import json
from importlib import resources
from . import jsons

# Load Esther.json -- Sidereals
with resources.files(jsons).joinpath("Esther.json").open("r", encoding="utf-8") as file:
    esther_dict = json.load(file)

# Load Skill.json
with resources.files(jsons).joinpath("Skill.json").open("r", encoding="utf-8") as file:
    skills_dict = json.load(file)

# Load SkillBuff.json
with resources.files(jsons).joinpath("SkillBuff.json").open(
    "r", encoding="utf-8"
) as file:
    status_effect_dict = json.load(file)

# Load SkillEffect.json -- Such as Items/Consumables
with resources.files(jsons).joinpath("SkillEffect.json").open(
    "r", encoding="utf-8"
) as file:
    items_dict = json.load(file)


# Special use cases
special_skills_dict = {
    "0": {"name": "Bleed", "img_src": "Buff_168.png"},
}
