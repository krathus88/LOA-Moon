import json
from importlib import resources
from . import jsons

# Load Skill.json
with resources.files(jsons).joinpath("Skill.json").open() as file:
    skills = json.load(file)

# Load SkillBuff.json
with resources.files(jsons).joinpath("SkillBuff.json").open() as file:
    buffs = json.load(file)
