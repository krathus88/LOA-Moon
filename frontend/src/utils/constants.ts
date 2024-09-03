export const SITE_NAME = "LOA Moon";

export const SUPP_MAP: ReadonlyMap<number, string> = new Map<number, string>([
    [105, "supp"],
    [204, "supp"],
    [602, "supp"],
]);

export const DIFFICULTY_COLOR_MAP: ReadonlyMap<string, string> = new Map<
    string,
    string
>([
    ["Solo", "#63ff63"],
    ["Normal", "rgb(222, 226, 230)"],
    ["Hard", "orange"],
    ["Extreme", "#FE6D73"],
    ["Inferno", "red"],
    ["Trial", "red"],
    ["The First", "#12EED4"],
]);

export const CLASS_NAME_TO_CLASS_ID: ReadonlyMap<string, number> = new Map<
    string,
    number
>([
    ["Berserker", 102],
    ["Destroyer", 103],
    ["Gunlancer", 104],
    ["Paladin", 105],
    ["Arcanist", 202],
    ["Summoner", 203],
    ["Bard", 204],
    ["Sorceress", 205],
    ["Wardancer", 302],
    ["Scrapper", 303],
    ["Soulfist", 304],
    ["Glaivier", 305],
    ["Striker", 312],
    ["Breaker", 313],
    ["Deathblade", 402],
    ["Shadowhunter", 403],
    ["Reaper", 404],
    ["Souleater", 405],
    ["Sharpshooter", 502],
    ["Deadeye", 503],
    ["Artillerist", 504],
    ["Machinist", 505],
    ["Gunslinger", 512],
    ["Artist", 602],
    ["Aeromancer", 603],
]);

export const CLASS_SPECS: Readonly<Record<string, ReadonlyArray<string>>> = {
    Berserker: ["Mayhem", "Berserker's Technique"],
    Destroyer: ["Rage Hammer", "Gravity Training"],
};

export const ENCOUNTER_GROUPS = [
    {
        label: "Echidna",
        options: [
            { value: "echidna_g1", label: "Echidna - G1" },
            { value: "echidna_g2", label: "Echidna - G2" },
        ],
    },
    {
        label: "Thaemine",
        options: [
            { value: "thaemine_g1", label: "Thaemine - G1" },
            { value: "thaemine_g2", label: "Thaemine - G2" },
            { value: "thaemine_g3", label: "Thaemine - G3" },
            { value: "thaemine_g4", label: "Thaemine - G4" },
        ],
    },
    {
        label: "Ivory Tower",
        options: [
            { value: "ivory tower_g1", label: "Ivory Tower - G1" },
            { value: "ivory tower_g2", label: "Ivory Tower - G2" },
            { value: "ivory tower_g3", label: "Ivory Tower - G3" },
        ],
    },
    {
        label: "Akkan",
        options: [
            { value: "akkan_g1", label: "Akkan - G1" },
            { value: "akkan_g2", label: "Akkan - G2" },
            { value: "akkan_g3", label: "Akkan - G3" },
        ],
    },
    {
        label: "Kayangel",
        options: [
            { value: "kayangel_g1", label: "Kayangel - G1" },
            { value: "kayangel_g2", label: "Kayangel - G2" },
            { value: "kayangel_g3", label: "Kayangel - G3" },
        ],
    },
    {
        label: "Brelshaza",
        options: [
            { value: "brelshaza_g1", label: "Brelshaza - G1" },
            { value: "brelshaza_g2", label: "Brelshaza - G2" },
            { value: "brelshaza_g3", label: "Brelshaza - G3" },
            { value: "brelshaza_g4", label: "Brelshaza - G4" },
        ],
    },
    {
        label: "Kakul-Saydon",
        options: [
            { value: "kakul-saydon_g1", label: "Kakul-Saydon - G1" },
            { value: "kakul-saydon_g2", label: "Kakul-Saydon - G2" },
            { value: "kakul-saydon_g3", label: "Kakul-Saydon - G3" },
        ],
    },
    {
        label: "Vykas",
        options: [
            { value: "vykas_g1", label: "Vykas - G1" },
            { value: "vykas_g2", label: "Vykas - G2" },
        ],
    },
    {
        label: "Valtan",
        options: [
            { value: "valtan_g1", label: "Valtan - G1" },
            { value: "valtan_g2", label: "Valtan - G2" },
        ],
    },

    {
        label: "Hanumatan",
        options: [{ value: "hanumatan_g1", label: "Hanumatan" }],
    },
];

export const DIFFICULTY_LEVELS = [
    { value: "Normal", label: "Normal" },
    { value: "Hard", label: "Hard" },
    { value: "Extreme", label: "Extreme" },
    { value: "Inferno", label: "Inferno" },
    { value: "Trial", label: "Trial" },
    { value: "The First", label: "The First" },
];
