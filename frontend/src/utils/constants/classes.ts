import { PlayerRoleType } from "@type/GeneralType";

export const SUPP_MAP: ReadonlyMap<number, string> = new Map<number, PlayerRoleType>([
    [105, "supp"],
    [204, "supp"],
    [602, "supp"],
]);

export const CLASS_ID_TO_CLASS_NAME: ReadonlyMap<number, string> = new Map<
    number,
    string
>([
    [102, "Berserker"],
    [103, "Destroyer"],
    [104, "Gunlancer"],
    [105, "Paladin"],
    [112, "Slayer"],
    [202, "Arcanist"],
    [203, "Summoner"],
    [204, "Bard"],
    [205, "Sorceress"],
    [302, "Wardancer"],
    [303, "Scrapper"],
    [304, "Soulfist"],
    [305, "Glaivier"],
    [312, "Striker"],
    [313, "Breaker"],
    [402, "Deathblade"],
    [403, "Shadowhunter"],
    [404, "Reaper"],
    [405, "Souleater"],
    [502, "Sharpshooter"],
    [503, "Deadeye"],
    [504, "Artillerist"],
    [505, "Machinist"],
    [512, "Gunslinger"],
    [602, "Artist"],
    [603, "Aeromancer"],
]);

export const CLASS_SPECS: Readonly<Record<string, ReadonlyArray<string>>> = {
    102: ["Mayhem", "Berserker's Technique"], // Berserker
    103: ["Rage Hammer", "Gravity Training"], // Destroyer
    104: ["Combat Readiness", "Lone Knight", "Princess Maker"], // Gunlancer
    105: ["Blessed Aura", "Judgment"], // Paladin
    112: ["Predator", "Punisher"], // Slayer
    202: ["Empress's Grace", "Order of the Emperor"], // Arcanist
    203: ["Master Summoner", "Communication Overflow"], // Summoner
    204: ["Desperate Salvation", "True Courage"], // Bard
    205: ["Igniter", "Reflux"], // Sorceress
    302: ["Esoteric Skill Enhancement", "First Intention"], // Wardancer
    303: ["Shock Training", "Ultimate Skill: Taijutsu"], // Scrapper
    304: ["Energy Overflow", "Robust Spirit"], // Soulfist
    305: ["Pinnacle", "Control"], // Glaivier
    312: ["Esoteric Flurry", "Deathblow"], // Striker
    313: ["Asura's Path", "Brawl King Storm"], // Breaker
    402: ["Remaining Energy", "Surge"], // Deathblade
    403: ["Demonic Impulse", "Perfect Suppression"], // Shadowhunter
    404: ["Lunar Voice", "Hunger"], // Reaper
    405: ["Night's Edge", "Full Moon Harvester"], // Souleater
    502: ["Loyal Companion", "Death Strike"], // Sharpshooter
    503: ["Enhanced Weapon", "Pistoleer"], // Deadeye
    504: ["Barrage Enhancement", "Firepower Enhancement"], // Artillerist
    505: ["Evolutionary Legacy", "Arthetinean Skill"], // Machinist
    512: ["Peacemaker", "Time to Hunt"], // Gunslinger
    602: ["Recurrence", "Full Bloom"], // Artist
    603: ["Wind Fury", "Drizzle"], // Aeromancer
};

export const CLASS_GROUPS = [
    {
        label: "Warrior",
        options: [
            { value: 102, label: "Berserker" },
            { value: 103, label: "Destroyer" },
            { value: 104, label: "Gunlancer" },
            { value: 105, label: "Paladin" },
            { value: 112, label: "Slayer" },
        ],
    },
    {
        label: "Mages",
        options: [
            { value: 202, label: "Arcanist" },
            { value: 203, label: "Summoner" },
            { value: 204, label: "Bard" },
            { value: 205, label: "Sorceress" },
        ],
    },
    {
        label: "Fighters",
        options: [
            { value: 302, label: "Wardancer" },
            { value: 303, label: "Scrapper" },
            { value: 304, label: "Soulfist" },
            { value: 305, label: "Glaivier" },
            { value: 312, label: "Striker" },
            { value: 313, label: "Breaker" },
        ],
    },
    {
        label: "Assassins",
        options: [
            { value: 402, label: "Deathblade" },
            { value: 403, label: "Shadowhunter" },
            { value: 404, label: "Reaper" },
            { value: 405, label: "Souleater" },
        ],
    },
    {
        label: "Gunners",
        options: [
            { value: 502, label: "Sharpshooter" },
            { value: 503, label: "Deadeye" },
            { value: 504, label: "Artillerist" },
            { value: 505, label: "Machinist" },
            { value: 512, label: "Gunslinger" },
        ],
    },
    {
        label: "Specialists",
        options: [
            { value: 602, label: "Artist" },
            { value: 603, label: "Aeromancer" },
        ],
    },
];

export const SUBCLASS_GROUPS = [
    {
        label: "Berserker",
        options: [
            { value: "Berserker's Technique", label: "Berserker's Technique" },
            { value: "Mayhem", label: "Mayhem" },
        ],
    },
    {
        label: "Destroyer",
        options: [
            { value: "Gravity Training", label: "Gravity Training" },
            { value: "Rage Hammer", label: "Rage Hammer" },
        ],
    },
    {
        label: "Gunlancer",
        options: [
            { value: "Combat Readiness", label: "Combat Readiness" },
            { value: "Lone Knight", label: "Lone Knight" },
            { value: "Princess Maker", label: "Princess Maker" },
        ],
    },
    {
        label: "Paladin",
        options: [
            { value: "Blessed Aura", label: "Blessed Aura -- SUPP" },
            { value: "Judgment", label: "Judgment" },
        ],
    },
    {
        label: "Slayer",
        options: [
            { value: "Predator", label: "Predator" },
            { value: "Punisher", label: "Punisher" },
        ],
    },
    {
        label: "Arcanist",
        options: [
            { value: "Empress's Grace", label: "Empress's Grace" },
            { value: "Order of the Emperor", label: "Order of the Emperor" },
        ],
    },
    {
        label: "Summoner",
        options: [
            { value: "Communication Overflow", label: "Communication Overflow" },
            { value: "Master Summoner", label: "Master Summoner" },
        ],
    },
    {
        label: "Bard",
        options: [
            { value: "Desperate Salvation", label: "Desperate Salvation -- SUPP" },
            { value: "True Courage", label: "True Courage" },
        ],
    },
    {
        label: "Sorceress",
        options: [
            { value: "Igniter", label: "Igniter" },
            { value: "Reflux", label: "Reflux" },
        ],
    },
    {
        label: "Wardancer",
        options: [
            {
                value: "Esoteric Skill Enhancement",
                label: "Esoteric Skill Enhancement",
            },
            { value: "First Intention", label: "First Intention" },
        ],
    },
    {
        label: "Scrapper",
        options: [
            { value: "Shock Training", label: "Shock Training" },
            { value: "Ultimate Skill: Taijutsu", label: "Ultimate Skill: Taijutsu" },
        ],
    },
    {
        label: "Soulfist",
        options: [
            { value: "Energy Overflow", label: "Energy Overflow" },
            { value: "Robust Spirit", label: "Robust Spirit" },
        ],
    },
    {
        label: "Glaivier",
        options: [
            { value: "Control", label: "Control" },
            { value: "Pinnacle", label: "Pinnacle" },
        ],
    },
    {
        label: "Striker",
        options: [
            { value: "Deathblow", label: "Deathblow" },
            { value: "Esoteric Flurry", label: "Esoteric Flurry" },
        ],
    },
    {
        label: "Breaker",
        options: [
            { value: "Asura's Path", label: "Asura's Path" },
            { value: "Brawl King Storm", label: "Brawl King Storm" },
        ],
    },
    {
        label: "Deathblade",
        options: [
            { value: "Remaining Energy", label: "Remaining Energy" },
            { value: "Surge", label: "Surge" },
        ],
    },
    {
        label: "Shadowhunter",
        options: [
            { value: "Demonic Impulse", label: "Demonic Impulse" },
            { value: "Perfect Suppression", label: "Perfect Suppression" },
        ],
    },
    {
        label: "Reaper",
        options: [
            { value: "Hunger", label: "Hunger" },
            { value: "Lunar Voice", label: "Lunar Voice" },
        ],
    },
    {
        label: "Souleater",
        options: [
            { value: "Full Moon Harvester", label: "Full Moon Harvester" },
            { value: "Night's Edge", label: "Night's Edge" },
        ],
    },
    {
        label: "Sharpshooter",
        options: [
            { value: "Death Strike", label: "Death Strike" },
            { value: "Loyal Companion", label: "Loyal Companion" },
        ],
    },
    {
        label: "Deadeye",
        options: [
            { value: "Enhanced Weapon", label: "Enhanced Weapon" },
            { value: "Pistoleer", label: "Pistoleer" },
        ],
    },
    {
        label: "Artillerist",
        options: [
            { value: "Barrage Enhancement", label: "Barrage Enhancement" },
            { value: "Firepower Enhancement", label: "Firepower Enhancement" },
        ],
    },
    {
        label: "Machinist",
        options: [
            { value: "Arthetinean Skill", label: "Arthetinean Skill" },
            { value: "Evolutionary Legacy", label: "Evolutionary Legacy" },
        ],
    },
    {
        label: "Gunslinger",
        options: [
            { value: "Peacemaker", label: "Peacemaker" },
            { value: "Time to Hunt", label: "Time to Hunt" },
        ],
    },
    {
        label: "Artist",
        options: [
            { value: "Full Bloom", label: "Full Bloom -- SUPP" },
            { value: "Recurrence", label: "Recurrence" },
        ],
    },
    {
        label: "Aeromancer",
        options: [
            { value: "Drizzle", label: "Drizzle" },
            { value: "Wind Fury", label: "Wind Fury" },
        ],
    },
];
