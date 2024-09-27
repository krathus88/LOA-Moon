patches = [
    1718751600,  # 2024-06-19 -- Minor Balance (Current)
]


supp_list = [
    "Artist",
    "Bard",
    "Paladin",
]

# Buffs Related
source_order = [
    "Artist",
    "Bard",
    "Paladin",
]  # Put these first; others will follow alphabetically

type_order = [
    "atkPwr",
    "brand",
    "identity",
    "synergy",
    "buffs",
]  # Define specific order for "type"

buff_categories = {
    "partySynergy": ["classskill", "identity", "ability"],
    "selfItemSynergy": [
        "pet",
        "cook",
        "battleitem",
        "dropsofether",
        "bracelet",
        "elixir",
    ],
    "setSynergy": ["set"],
    "selfSkillSynergy": ["classskill", "identity", "ability"],
    "other": ["etc"],
}

status_special_cases = []

allowed_status_groups = ["atkPwr", "brand", "identity", "buffs", "synergy"]

# src: https://github.com/snoww/loa-logs/blob/master/src/lib/utils/buffs.ts
allowed_buffs = {
    "Paladin": {
        "atkPwr": {
            "buffs": [
                36200,  # Heavenly Blessings
                36170,  # Wrath of God
            ],
        },
        "identity": {
            "buffs": [
                500131,  # Aura of Blessing
                500149,  # Blessed Aura II
                500153,  # Blessed Aura III
            ],
        },
    },
    "Bard": {
        "atkPwr": {
            "buffs": [
                21170,  # Sonic Vibration
                21160,  # Heavenly Tune
            ],
        },
        "identity": {
            "buffs": [
                21140,  # Serenade of Courage 1
                21141,  # Serenade of Courage 2
                21142,  # Serenade of Courage 3
            ],
        },
    },
    "Artist": {
        "atkPwr": {
            "buffs": [
                31400,  # Paint: Sunsketch
                31410,  # Paint: Sun Well Skill
            ],
        },
        "identity": {
            "group": [
                310501,  # Artist Moonfal group
            ],
        },
    },
    "Berserker": {
        "buffs": {
            "group": [],
        },
    },
    "Destroyer": {
        "buffs": {
            "group": [],
        },
    },
    "Gunlancer": {
        "buffs": {
            "group": [],
        },
    },
    "Slayer": {
        "buffs": {
            "group": [],
        },
    },
    "Arcanist": {
        "cards": {
            "group": [
                190913,
                190914,
                190915,
                190916,
                190920,
                190930,
                190940,
                190941,
                190950,
                190970,
                190980,
                190990,
                192810,
            ]
        },
    },
    "Summoner": {
        "buffs": {
            "group": [],
        },
    },
    "Sorceress": {
        "buffs": {
            "group": [],
        },
    },
    "Wardancer": {
        "buffs": {
            "group": [
                221200,  # Wind's Whisper
            ],
        },
    },
    "Scrapper": {
        "buffs": {
            "group": [],
        },
    },
    "Soulfist": {
        "buffs": {
            "group": [],
        },
    },
    "Glaivier": {
        "buffs": {
            "group": [],
        },
    },
    "Striker": {
        "buffs": {
            "group": [],
        },
    },
    "Breaker": {
        "buffs": {
            "group": [],
        },
    },
    "Deathblade": {
        "buffs": {
            "group": [
                251640,  # Maelstrom -- Dark Order
            ]
        }
    },
    "Shadowhunter": {
        "buffs": {
            "group": [],
        },
    },
    "Reaper": {
        "buffs": {
            "group": [],
        },
    },
    "Souleater": {
        "buffs": {
            "group": [],
        },
    },
    "Sharpshooter": {
        "buffs": {
            "group": [],
        },
    },
    "Deadeye": {
        "buffs": {
            "group": [],
        },
    },
    "Artillerist": {
        "buffs": {
            "group": [],
        },
    },
    "Machinist": {
        "buffs": {
            "group": [],
        },
    },
    "Gunslinger": {
        "buffs": {
            "group": [],
        },
    },
    "Aeromancer": {
        "buffs": {
            "group": [
                # 320404,  # Sun Shower  -- no need for two as they overlap eachother
                320405,  # Sun Shower -- good description
            ]
        },
        "buffs_2": {
            "group": [
                321610,  # Strong Wind
            ]
        },
    },
}

allowed_debuffs = {
    "Paladin": {
        "brand": {
            "debuffs": [
                36050,  # Light Shock
                36080,  # Sword of Justice
                36150,  # God’s Decree (Godsent Law)
                36100,  # Holy Explosion
            ],
        },
    },
    "Bard": {
        "brand": {
            "debuffs": [
                21020,  # Sound shock, Stigma, Harp of Rythm
                21290,  # Sonatina
            ],
        },
    },
    "Artist": {
        "brand": {
            "debuffs": [
                31426,  # Paint: Drawing Orchids
            ],
        },
    },
    "Berserker": {
        "synergy": {
            "group": [
                161210,  # Damage Amp.
                162230,  # Damage Amp.
            ]
        },
    },
    "Destroyer": {
        "synergy": {
            "group": [
                180111,  # Armor Destruction
                180505,  # Armor Destruction
                181804,  # Armor Destruction
            ]
        },
    },
    "Gunlancer": {
        "synergy": {
            "group": [
                170404,  # Armor Destruction
                171002,  # Armor Destruction
            ]
        },
        "synergy_2": {
            "group": [
                171803,  # Open Weakness
                171807,  # Open Weakness
            ]
        },
    },
    "Slayer": {
        "synergy": {
            "group": [
                451102,  # Damage Amp.
                452230,  # Damage Amp.
            ]
        },
    },
    "Arcanist": {
        "synergy": {
            "group": [
                193207,  # Weakness Exposure
                192612,  # Weakness Exposure
            ]
        },
        "cards": {
            "group": [
                190931,  # Weakness Detection
            ]
        },
    },
    "Summoner": {
        "synergy": {
            "group": [
                201808,  # Defense Reduction
            ]
        },
    },
    "Sorceress": {
        "synergy": {
            "group": [
                372020,  # Damage Amp.
                372120,  # Damage Amp.
                372452,  # Damage Amp.
            ]
        },
    },
    "Wardancer": {
        "synergy": {
            "group": [
                220802,  # Weakness Exposure
                221620,  # Weakness Exposure
                221710,  # Weakness Exposure
            ],
        },
    },
    "Scrapper": {
        "synergy": {
            "group": [
                230611,  # Damage Amp.
                232805,  # Damage Amp.
            ],
        },
    },
    "Soulfist": {
        "synergy": {
            "group": [],  # wtf is wrong with this class where tf are the buff ids
        },
    },
    "Glaivier": {
        "synergy": {
            "group": [
                340520,  # Target Weak Point
                341708,  # Target Weak Point
            ],
        },
    },
    "Striker": {
        "synergy": {
            "group": [
                390803,  # Weakness Exposure
                392900,  # Weakness Exposure
            ],
        },
    },
    "Breaker": {
        "synergy": {
            "group": [
                470031,  # Damage Amp.
                1000047120,  # Damage Amp. -- "custom id" -- Crater Strike
            ],
        },
    },
    "Deathblade": {
        "synergy": {
            "group": [
                250410,  # Open Weakness
                # 250411,  # Open Weakness
                251220,  # Open Weakness
                # 251221,  # Open Weakness
                251310,  # Open Weakness
                # 251311,  # Open Weakness
            ],
        },
    },
    "Shadowhunter": {
        "synergy": {
            "group": [
                270501,  # Damage Amp.
                271704,  # Damage Amp.
                278100,  # Damage Amp.
            ],
        },
    },
    "Reaper": {
        "synergy": {
            "group": [
                310793,  # Corrosion
                280010,  # Corrosion -- Unsure if it's here
            ],
        },
    },
    "Souleater": {
        "synergy": {
            "group": [
                460504,  # Damage Amp. -- potentially breaker
                462110,  # Damage Amp.
            ],
        },
    },
    "Sharpshooter": {
        "synergy": {
            "group": [
                280412,  # Damage Amp.
            ]
        },
    },
    "Deadeye": {
        "synergy": {
            "group": [
                291230,  # Weakness Exposure
                291820,  # Weakness Exposure
            ]
        },
    },
    "Artillerist": {
        "synergy": {
            "group": [
                300402,  # Armor Destruction
                300510,  # Armor Destruction
                301006,  # Armor Destruction
            ]
        },
        "synergy_2": {
            "group": [
                301830,  # Target Focus
            ]
        },
    },
    "Machinist": {
        "synergy": {
            "group": [
                350502,  # Fighting Spirit Enhancement
                357501,  # Fighting Spirit Enhancement
            ]
        },
    },
    "Gunslinger": {
        "synergy": {
            "group": [
                381820,  # Weakness Exposure
                382030,  # Weakness Exposure
                382220,  # Weakness Exposure
            ]
        },
    },
    "Aeromancer": {
        "synergy": {
            "group": [
                321120,  # Weakness Exposure
                321320,  # Weakness Exposure
                321730,  # Weakness Exposure
                322708,  # Weakness Exposure -- Storm's Approach
            ]
        },
    },
}
