# Source: https://github.com/evilandrex/raided-loa-scraper/blob/2193cc31d8a916375029a02e9adef89e148e4196/api.py#L256
def classify_class(log: dict) -> dict:
    """Classify each player's spec based on the log"""

    def _check_skillSelfBuff(buffName: str) -> bool:
        pSelfBuffs = [
            buffCatalog[buff["buffs"][0]]["name"] for buff in pDetail["skillSelfBuffs"]
        ]
        return len([buff for buff in pSelfBuffs if buffName in buff]) > 0

    def _check_set(setName: str) -> bool:
        return f"set_{setName}" in pDetail["selfBuff"].keys()

    # Grab relevant data
    buffCatalog = log["data"]["buffCatalog"]
    skillCatalog = log["data"]["skillCatalog"]

    playerSpecs = {}
    for name, data in log["players"].items():
        # Figure out class
        pClass = data["class"]
        # Get player details
        pDetail = log["data"]["players"][name]

        if pClass == "Berserker":
            # Check if you have the Mayhem self skill buff
            playerSpecs[name] = (
                "Mayhem" if _check_skillSelfBuff("Mayhem") else "Berserker's Technique"
            )
        elif pClass == "Destroyer":
            # Look for skill "18030" special "Basic 3 Chain Hits" and does high damage split
            playerSpecs[name] = (
                "Gravity Training"
                if "18030" in pDetail["skillDamage"].keys()
                and float(pDetail["skillDamage"]["18030"]["percent"]) > 30
                else "Rage Hammer"
            )
        elif pClass == "Gunlancer":
            # First check if they're Princess Maker
            if float(log["players"][name]["percent"]) < 5:
                playerSpecs[name] = "Princess Maker"
            else:
                # Looking for set
                playerSpecs[name] = (
                    "Combat Readiness"
                    if _check_set("Hallucination") or _check_set("Nightmare")
                    else "Lone Knight"
                )
        elif pClass == "Paladin":
            # Checking if this person does okay damage
            playerSpecs[name] = (
                "Judgment"
                if float(log["players"][name]["percent"]) > 10
                else "Blessed Aura"
            )
        elif pClass == "Slayer":
            # Looking for the "Predator" skill self buff
            playerSpecs[name] = (
                "Predator" if _check_skillSelfBuff("Predator") else "Punisher"
            )
        elif pClass == "Arcanist":
            # Uses the "Emperor" skill to decide spec
            playerSpecs[name] = (
                "Order of the Emperor"
                if "19282" in pDetail["skillDamage"].keys()
                else "Empress's Grace"
            )
        elif pClass == "Summoner":
            # Check if "20290" Kelsion, is in skills
            playerSpecs[name] = (
                "Communication Overflow"
                if "20290" in pDetail["skillDamage"].keys()
                else "Master Summoner"
            )
        elif pClass == "Bard":
            # Check if they're doing okay damage
            playerSpecs[name] = (
                "True Courage"
                if float(log["players"][name]["percent"]) > 10
                else "Desperate Salvation"
            )
        elif pClass == "Sorceress":
            # Looking for "Igniter" self buff
            playerSpecs[name] = (
                "Igniter" if _check_skillSelfBuff("Igniter") else "Reflux"
            )
        elif pClass == "Wardancer":
            # Looking for esoteric skill names
            playerSpecs[name] = (
                "Esoteric Skill Enhancement"
                if any(
                    [
                        "Esoteric Skill: " in skillCatalog[id]["name"]
                        for id in pDetail["skillDamage"].keys()
                    ]
                )
                else "First Intention"
            )
        elif pClass == "Scrapper":
            # This one is weird where the Shock Training buff is ID "500224" but it doesn't have a name
            playerSpecs[name] = (
                "Shock Training"
                if len(
                    [
                        buff
                        for buff in pDetail["skillSelfBuffs"]
                        if buff["buffs"][0] == "500224"
                    ]
                )
                > 0
                else "Ultimate Skill: Taijutsu"
            )
        elif pClass == "Soulfist":
            # A weird one where the RS Hype is ID "240250" but it doesn't have a name
            playerSpecs[name] = (
                "Robust Spirit"
                if len(
                    [
                        buff
                        for buff in pDetail["skillSelfBuffs"]
                        if buff["buffs"][0] == "240250"
                    ]
                )
                > 0
                else "Energy Overflow"
            )
        elif pClass == "Glaivier":
            # Look for the "Pinnacle" skill self buff
            playerSpecs[name] = (
                "Pinnacle" if _check_skillSelfBuff("Pinnacle") else "Control"
            )
        elif pClass == "Striker":
            # Looking for the skill ID "39110", Call of the Wind God
            playerSpecs[name] = (
                "Esoteric Flurry"
                if "39110" in pDetail["skillDamage"].keys()
                else "Deathblow"
            )
        elif pClass == "Breaker":
            # Looking for the skill "47020" Asura Destruction Basic Attack
            playerSpecs[name] = (
                "Asura's Path"
                if "47020" in pDetail["skillDamage"].keys()
                else "Brawl King Storm"
            )
        elif pClass == "Deathblade":
            # Check if "25402" RE Death Trance exists and does damage
            playerSpecs[name] = (
                "Remaining Energy"
                if "25402" in pDetail["skillDamage"].keys()
                and float(pDetail["skillDamage"]["25402"]["percent"]) > 10
                else "Surge"
            )
        elif pClass == "Shadowhunter":
            # Looking for Demonic Impulse self buff
            playerSpecs[name] = (
                "Demonic Impulse"
                if _check_skillSelfBuff("Demonic Impulse")
                else "Perfect Suppression"
            )
        elif pClass == "Reaper":
            # Checking for the "Lunar Voice" self buff
            playerSpecs[name] = (
                "Lunar Voice" if _check_skillSelfBuff("Lunar Voice") else "Hunger"
            )
        elif pClass == "Souleater":
            # Checking for "Soul Snatch" self buff
            playerSpecs[name] = (
                "Night's Edge"
                if _check_skillSelfBuff("Soul Snatch")
                else "Full Moon Harvester"
            )
        elif pClass == "Sharpshooter":
            # Look for Loyal Companion skill self buff
            playerSpecs[name] = (
                "Loyal Companion"
                if _check_skillSelfBuff("Loyal Companion")
                else "Death Strike"
            )
        elif pClass == "Deadeye":
            # Look for the "Enhanced Weapon" self skill buff
            playerSpecs[name] = (
                "Enhanced Weapon"
                if _check_skillSelfBuff("Enhanced Weapon")
                else "Pistoleer"
            )
        elif pClass == "Artillerist":
            # Looking for "30260" Barrage: Focus Fire and doing more than 10% damage
            playerSpecs[name] = (
                "Barrage Enhancement"
                if "30260" in pDetail["skillDamage"].keys()
                and float(pDetail["skillDamage"]["30260"]["percent"]) > 10
                else "Firepower Enhancement"
            )
        elif pClass == "Machinist":
            # Look for Evolutionary Legacy skill self buff
            playerSpecs[name] = (
                "Evolutionary Legacy"
                if _check_skillSelfBuff("Evolutionary Legacy")
                else "Arthetinean Skill"
            )
        elif pClass == "Gunslinger":
            # Looking for Sharpshooter skill
            playerSpecs[name] = (
                "Peacemaker" if "38110" in pDetail["skillDamage"] else "Time to Hunt"
            )
        elif pClass == "Artist":
            # Checks if they're doing okay damage
            playerSpecs[name] = (
                "Recurrence"
                if float(log["players"][name]["percent"]) > 10
                else "Full Bloom"
            )
        elif pClass == "Aeromancer":
            # Check for the synergy buff "320405" sunshower on the sunshower skill "32041"
            playerSpecs[name] = (
                "Wind Fury"
                if "32041" in pDetail["skillSynergy"].keys()
                and "603_320405" in pDetail["skillSynergy"]["32041"].keys()
                else "Drizzle"
            )
        else:
            playerSpecs[name] = "Unknown"

    return playerSpecs
