accepted_difficulties = ["Normal", "Hard", "Extreme", "Inferno", "Trial", "The First"]


encounter_map = {
    ### Legion Raids
    ## Valtan
    # G1
    "Dark Mountain Predator": {
        "gate": "G1",
        "instance": "Valtan",
        "difficulty": ["Normal", "Hard", "Extreme", "Inferno"],
        "num_players": 8,
    },
    # G2
    "Ravaged Tyrant of Beasts": {
        "gate": "G2",
        "instance": "Valtan",
        "difficulty": ["Normal", "Hard", "Extreme", "Inferno"],
        "num_players": 8,
    },
    ## Vykas
    # G1
    "Covetous Devourer Vykas": {
        "gate": "G1",
        "instance": "Vykas",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G1 -- Inferno
    "Nightmarish Morphe": {
        "gate": "G1",
        "instance": "Vykas",
        "difficulty": ["Inferno"],
        "num_players": 8,
    },
    # G2
    "Covetous Legion Commander Vykas": {
        "gate": "G2",
        "instance": "Vykas",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G2 -- Inferno
    "Covetous Devourer Vykas": {
        "gate": "G2",
        "instance": "Vykas",
        "difficulty": ["Inferno"],
        "num_players": 8,
    },
    # G3 -- Inferno
    "Covetous Legion Commander Vykas": {
        "gate": "G2",
        "instance": "Vykas",
        "difficulty": ["Inferno"],
        "num_players": 8,
    },
    ## Clown
    # G1
    "Saydon": {
        "gate": "G1",
        "instance": "Kakul-Saydon",
        "difficulty": ["Normal", "Inferno"],
        "num_players": 4,
    },
    # G2
    "Kakul": {
        "gate": "G2",
        "instance": "Kakul-Saydon",
        "difficulty": ["Normal", "Inferno"],
        "num_players": 4,
    },
    # G3
    "Encore-Desiring Kakul-Saydon": {
        "gate": "G3",
        "instance": "Kakul-Saydon",
        "difficulty": ["Normal", "Inferno"],
        "num_players": 4,
    },
    ## Brelshaza
    # G1
    "Gehenna Helkasirs": {
        "gate": "G1",
        "instance": "Brelshaza",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G2
    "Ashtarot": {
        "gate": "G2",
        "instance": "Brelshaza",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G3
    "Primordial Nightmare": {
        "gate": "G3",
        "instance": "Brelshaza",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G4
    "Phantom Legion Commander Brelshaza": {
        "gate": "G4",
        "instance": "Brelshaza",
        "difficulty": ["Normal", "Hard", "Inferno"],
        "num_players": 8,
    },
    ## Akkan
    # G1
    "Evolved Maurug": {
        "gate": "G1",
        "instance": "Akkan",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G2
    "Lord of Degradation Akkan": {
        "gate": "G2",
        "instance": "Akkan",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G3
    "Plague Legion Commander Akkan": {
        "gate": "G3",
        "instance": "Akkan",
        "difficulty": ["Normal"],
        "num_players": 8,
    },
    "Lord of Kartheon Akkan": {
        "gate": "G3",
        "instance": "Akkan",
        "difficulty": ["Hard"],
        "num_players": 8,
    },
    ## Thaemine
    # G1
    "Killineza the Dark Worshipper": {
        "gate": "G1",
        "instance": "Thaemine",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G2
    "Valinak, Herald of the End": {
        "gate": "G2",
        "instance": "Thaemine",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G3
    "Thaemine the Lightqueller": {
        "gate": "G3",
        "instance": "Thaemine",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G4
    "Thaemine, Conqueror of Stars": {
        "gate": "G4",
        "instance": "Thaemine",
        "difficulty": ["Hard", "The First"],
        "num_players": 8,
    },
    ## Echidna
    # G1
    "Red Doom Narkiel": {
        "gate": "G1",
        "instance": "Echidna",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    # G2
    "Covetous Master Echidna": {
        "gate": "G2",
        "instance": "Echidna",
        "difficulty": ["Normal", "Hard"],
        "num_players": 8,
    },
    ## Behemoth
    # G1
    "Behemoth, the Storm Commander": {
        "gate": "G1",
        "instance": "Behemoth",
        "difficulty": ["Normal"],
        "num_players": 16,
    },
    "Despicable Skolakia": {
        "refers_to": "Behemoth, the Storm Commander",
    },
    "Untrue Crimson Yoho": {
        "refers_to": "Behemoth, the Storm Commander",
    },
    "Ruthless Lakadroff": {
        "refers_to": "Behemoth, the Storm Commander",
    },
    "Vicious Argeos": {
        "refers_to": "Behemoth, the Storm Commander",
    },
    # G2
    "Behemoth, Cruel Storm Slayer": {
        "gate": "G2",
        "instance": "Behemoth",
        "difficulty": ["Normal"],
        "num_players": 16,
    },
    ### Abyssal Dungeons
    ## Kayangel
    # G1
    "Tienis": {
        "gate": "G1",
        "instance": "Kayangel",
        "difficulty": ["Normal", "Hard"],
        "num_players": 4,
    },
    # G2
    "Prunya": {
        "gate": "G2",
        "instance": "Kayangel",
        "difficulty": ["Normal", "Hard"],
        "num_players": 4,
    },
    # G3
    "Lauriel": {
        "gate": "G3",
        "instance": "Kayangel",
        "difficulty": ["Normal", "Hard"],
        "num_players": 4,
    },
    ## Ivory Tower
    # G1
    "Kaltaya, the Blooming Chaos": {
        "gate": "G1",
        "instance": "Ivory Tower",
        "difficulty": ["Normal", "Hard"],
        "num_players": 4,
    },
    # G2
    "Rakathus, the Lurking Arrogance": {
        "gate": "G2",
        "instance": "Ivory Tower",
        "difficulty": ["Normal", "Hard"],
        "num_players": 4,
    },
    # G3
    "Lazaram, the Trailblazer": {
        "gate": "G3",
        "instance": "Ivory Tower",
        "difficulty": ["Normal", "Hard"],
        "num_players": 4,
    },
    ### Guardian Raids
    "Achates": {
        "gate": "",
        "instance": "Achates",
        "difficulty": ["Trial"],
        "num_players": 4,
    },
    "Caliligos": {
        "gate": "",
        "instance": "Caliligos",
        "difficulty": ["Trial"],
        "num_players": 4,
    },
    "Hanumatan": {
        "gate": "",
        "instance": "Hanumatan",
        "difficulty": ["Trial"],
        "num_players": 4,
    },
}
