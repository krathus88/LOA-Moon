import json
from importlib import resources
from . import jsons

# Load Skill.json
with resources.files(jsons).joinpath("Skill.json").open("r", encoding="utf-8") as file:
    skills_dict = json.load(file)

# Load SkillBuff.json
with resources.files(jsons).joinpath("SkillBuff.json").open(
    "r", encoding="utf-8"
) as file:
    buffs_dict = json.load(file)
