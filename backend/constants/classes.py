classes_map = {
    0: "Unknown",
    101: "Warrior (Male)",
    102: "Berserker",
    103: "Destroyer",
    104: "Gunlancer",
    105: "Paladin",
    111: "Female Warrior",
    112: "Slayer",
    201: "Mage",
    202: "Arcanist",
    203: "Summoner",
    204: "Bard",
    205: "Sorceress",
    301: "Martial Artist (Female)",
    302: "Wardancer",
    303: "Scrapper",
    304: "Soulfist",
    305: "Glaivier",
    311: "Martial Artist (Male)",
    312: "Striker",
    313: "Breaker",
    401: "Assassin",
    402: "Deathblade",
    403: "Shadowhunter",
    404: "Reaper",
    405: "Souleater",
    501: "Gunner (Male)",
    502: "Sharpshooter",
    503: "Deadeye",
    504: "Artillerist",
    505: "Machinist",
    511: "Gunner (Female)",
    512: "Gunslinger",
    601: "Specialist",
    602: "Artist",
    603: "Aeromancer",
    604: "Alchemist",
}

class_name_to_class_id = {
    "Unknown": 0,
    "Warrior (Male)": 101,
    "Berserker": 102,
    "Destroyer": 103,
    "Gunlancer": 104,
    "Paladin": 105,
    "Female Warrior": 111,
    "Slayer": 112,
    "Mage": 201,
    "Arcanist": 202,
    "Summoner": 203,
    "Bard": 204,
    "Sorceress": 205,
    "Martial Artist (Female)": 301,
    "Wardancer": 302,
    "Scrapper": 303,
    "Soulfist": 304,
    "Glaivier": 305,
    "Martial Artist (Male)": 311,
    "Striker": 312,
    "Breaker": 313,
    "Assassin": 401,
    "Deathblade": 402,
    "Shadowhunter": 403,
    "Reaper": 404,
    "Souleater": 405,
    "Gunner (Male)": 501,
    "Sharpshooter": 502,
    "Deadeye": 503,
    "Artillerist": 504,
    "Machinist": 505,
    "Gunner (Female)": 511,
    "Gunslinger": 512,
    "Specialist": 601,
    "Artist": 602,
    "Aeromancer": 603,
    "Alchemist": 604,
}

class_list = [
    "Berserker",
    "Destroyer",
    "Gunlancer",
    "Paladin",
    "Slayer",
    "Arcanist",
    "Summoner",
    "Bard",
    "Sorceress",
    "Wardancer",
    "Scrapper",
    "Soulfist",
    "Glaivier",
    "Striker",
    "Breaker",
    "Deathblade",
    "Shadowhunter",
    "Reaper",
    "Souleater",
    "Sharpshooter",
    "Deadeye",
    "Artillerist",
    "Machinist",
    "Gunslinger",
    "Artist",
    "Aeromancer",
]

subclass_to_shortened_subclass = {
    "Unknown": "N/A",
    # Berserker
    "Mayhem": "M",
    "Berserker's Technique": "BT",
    # Destroyer
    "Rage Hammer": "RH",
    "Gravity Training": "GT",
    # Gunlancer
    "Lone Knight": "LK",
    "Princess Maker": "PM",
    # Paladin
    "Blessed Aura": "BA",
    "Judgment": "J",
    # Slayer
    "Predator": "Pre",
    "Punisher": "Pun",
    # Arcanist
    "Empress's Grace": "EG",
    "Order of the Emperor": "OE",
    # Summoner
    "Master Summoner": "MS",
    "Communication Overflow": "CO",
    # Bard
    "Desperate Salvation": "DS",
    "True Courage": "TC",
    # Sorceress
    "Igniter": "I",
    "Reflux": "R",
    # Wardancer
    "Esoteric Skill Enhancement": "ESE",
    "First Intention": "FI",
    # Scrapper
    "Shock Training": "ST",
    "Ultimate Skill: Taijutsu": "T",
    # Soulfist
    "Energy Overflow": "EO",
    "Robust Spirit": "RS",
    # Glaivier
    "Pinnacle": "P",
    "Control": "C",
    # Striker
    "Esoteric Flurry": "EF",
    "Deathblow": "D",
    # Breaker
    "Asura's Path": "AP",
    "Brawl King Storm": "BKS",
    # Deathblade
    "Remaining Energy": "RE",
    "Surge": "S",
    # Shadowhunter
    "Demonic Impulse": "DI",
    "Perfect Suppression": "PS",
    # Reaper
    "Lunar Voice": "LV",
    "Hunger": "H",
    # Souleater
    "Night's Edge": "NE",
    "Full Moon Harvester": "FMH",
    # Sharpshooter
    "Loyal Companion": "LC",
    "Death Strike": "DS",
    # Deadeye
    "Enhanced Weapon": "EW",
    "Pistoleer": "P",
    # Artillerist
    "Barrage Enhancement": "BE",
    "Firepower Enhancement": "FE",
    # Machinist
    "Evolutionary Legacy": "EL",
    "Arthetinean Skill": "AS",
    # Gunslinger
    "Peacemaker": "P",
    "Time to Hunt": "TH",
    # Artist
    "Recurrence": "R",
    "Full Bloom": "FB",
    # Aeromancer
    "Wind Fury": "WF",
    "Drizzle": "D",
}

NOT_USED_subclass_to_shortened_subclass_NOT_USED = {
    "Unknown": "N/A",
    # Berserker
    "Mayhem": "MAY",
    "Berserker's Technique": "BT",
    # Destroyer
    "Rage Hammer": "RH",
    "Gravity Training": "GT",
    # Gunlancer
    "Lone Knight": "LK",
    "Princess Maker": "PM",
    # Paladin
    "Blessed Aura": "BA",
    "Judgment": "JUD",
    # Slayer
    "Predator": "PRE",
    "Punisher": "PUN",
    # Arcanist
    "Empress's Grace": "EG",
    "Order of the Emperor": "OE",
    # Bard
    "Desperate Salvation": "DS",
    "True Courage": "TC",
    # Sorceress
    "Igniter": "IGN",
    "Reflux": "RFX",
    # Summoner
    "Master Summoner": "MS",
    "Communication Overflow": "CO",
    # Glaivier
    "Pinnacle": "PNC",
    "Control": "CTR",
    # Scrapper
    "Shock Training": "ST",
    "Ultimate Skill: Taijutsu": "TAI",
    # Soulfist
    "Energy Overflow": "EO",
    "Robust Spirit": "RS",
    # Wardancer
    "Esoteric Skill Enhancement": "ESE",
    "First Intention": "FI",
    # Striker
    "Esoteric Flurry": "EF",
    "Deathblow": "DBW",
    # Breaker
    "Asura's Path": "AP",
    "Brawl King Storm": "BKS",
    # Artillerist
    "Barrage Enhancement": "BE",
    "Firepower Enhancement": "FE",
    # Deadeye
    "Enhanced Weapon": "EW",
    "Pistoleer": "PTL",
    # Gunslinger
    "Peacemaker": "PCM",
    "Time to Hunt": "TTH",
    # Machinist
    "Evolutionary Legacy": "EL",
    "Arthetinean Skill": "AS",
    # Sharpshooter
    "Loyal Companion": "LC",
    "Death Strike": "DS",
    # Deathblade
    "Remaining Energy": "RE",
    "Surge": "SRG",
    # Reaper
    "Lunar Voice": "LV",
    "Hunger": "HUN",
    # Shadowhunter
    "Demonic Impulse": "DI",
    "Perfect Suppression": "PS",
    # Souleater
    "Night's Edge": "NE",
    "Full Moon Harvester": "FMH",
    # Aeromancer
    "Wind Fury": "WF",
    "Drizzle": "DRZ",
    # Artist
    "Recurrence": "REC",
    "Full Bloom": "FB",
}
