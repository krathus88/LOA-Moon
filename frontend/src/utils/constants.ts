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

const MAP_TO_IMAGE: Readonly<{
    classes: Readonly<Record<number, string>>;
    raids: Readonly<Record<string, string>>;
    other: Readonly<Record<string, string>>;
}> = {
    classes: {
        // Warriors
        101: "https://i.postimg.cc/bwz8S43G/101.png",
        102: "https://i.postimg.cc/d0fKX3vd/102.png",
        103: "https://i.postimg.cc/mrks8CxB/103.png",
        104: "https://i.postimg.cc/4xBG6wSW/104.png",
        105: "https://i.postimg.cc/9Mqjj2Fk/105.png",
        111: "https://i.postimg.cc/mkYftS9N/111.png",
        112: "https://i.postimg.cc/4ykRf0Yx/112.png",
        // Mages
        201: "https://i.postimg.cc/DfLKj7NJ/201.png",
        202: "https://i.postimg.cc/sDzCbtFn/202.png",
        203: "https://i.postimg.cc/vHvwy3bG/203.png",
        204: "https://i.postimg.cc/wjT8jLjL/204.png",
        205: "https://i.postimg.cc/XYHMGqrh/205.png",
        // Fighters
        301: "https://i.postimg.cc/gJh1TKgF/301.png",
        302: "https://i.postimg.cc/tJH8QVc1/302.png",
        303: "https://i.postimg.cc/8Cj2hGWC/303.png",
        304: "https://i.postimg.cc/7Ldp9RMn/304.png",
        305: "https://i.postimg.cc/4ybqJxCW/305.png",
        311: "https://i.postimg.cc/dQ8zR47G/311.png",
        312: "https://i.postimg.cc/m2BKmCMJ/312.png",
        313: "https://i.postimg.cc/7Y9ddhn6/313.png",
        // Assassins
        401: "https://i.postimg.cc/MpGNSw9Y/401.png",
        402: "https://i.postimg.cc/8zn3kY3g/402.png",
        403: "https://i.postimg.cc/4370Y5k7/403.png",
        404: "https://i.postimg.cc/R0kDKH4P/404.png",
        405: "https://i.postimg.cc/qR2ZLv7p/405.png",
        // Gunners
        501: "https://i.postimg.cc/7hDtQrC0/501.png",
        502: "https://i.postimg.cc/7hVsFt7c/502.png",
        503: "https://i.postimg.cc/66Lm4qS0/503.png",
        504: "https://i.postimg.cc/yY1rmBCz/504.png",
        505: "https://i.postimg.cc/yYLpn573/505.png",
        511: "https://i.postimg.cc/t47Sc5gS/511.png",
        512: "https://i.postimg.cc/T3S7vDLR/512.png",
        // Specialists
        601: "https://i.postimg.cc/mrHdLgC7/601.png",
        602: "https://i.postimg.cc/zBYxVYF6/602.png",
        603: "https://i.postimg.cc/vB73n2PB/603.png",
        604: "https://i.postimg.cc/8c1wmd3b/604.png",
    },
    raids: {
        // Legion Raids
        Valtan: "https://i.postimg.cc/PJrzwXp3/Valtan.webp",
        Vykas: "https://i.postimg.cc/Hxt9ncx8/Vykas.webp",
        "Kakul-Saydon": "https://i.postimg.cc/NjyDDjNZ/Kakul-Saydon.webp",
        Brelshaza: "https://i.postimg.cc/xTpgLzPK/Brelshaza.webp",
        Akkan: "https://i.postimg.cc/TY3Cy9nd/Akkan.webp",
        Thaemine: "https://i.postimg.cc/764NqMxy/Thaemine.webp",
        Echidna: "https://i.postimg.cc/yd5YFnWM/Echidna.webp",
        Behemoth: "https://i.postimg.cc/xdmDVQXs/Behemoth.webp",
        // Abyssal Dungeons
        Kayangel: "https://i.postimg.cc/cJwmq5Gm/Kayangel.webp",
        "Ivory Tower": "https://i.postimg.cc/fR6KrQpy/Ivory-Tower.webp",
        // Guardian Raids
        Achates: "https://i.postimg.cc/Y9N5jxfY/Achates.webp",
        Caliligos: "https://i.postimg.cc/YCZKP0CG/Caliligos.webp",
        Hanumatan: "https://i.postimg.cc/G210cfYb/Hanumatan.webp",
    },
    other: {
        "default-avatar": "https://i.postimg.cc/WzWmmB02/default-avatar.webp",
        logo: "https://i.postimg.cc/Pf2Mkw9B/logo.png",
    },
};

export const MAP_TO_IMAGE_CLASSES = MAP_TO_IMAGE.classes;

export const MAP_TO_IMAGE_RAIDS = MAP_TO_IMAGE.raids;

export const MAP_TO_IMAGE_OTHER = MAP_TO_IMAGE.other;
