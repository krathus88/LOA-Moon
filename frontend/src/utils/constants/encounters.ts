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

export const ENCOUNTER_GROUPS = [
    {
        label: "Behemoth",
        options: [
            { value: "behemoth_g1", label: "Behemoth - G1" },
            { value: "behemoth_g1", label: "Behemoth - G2" },
        ],
    },
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
        label: "Achates",
        options: [{ value: "achates", label: "Achates - Trial" }],
    },
    {
        label: "Caliligos",
        options: [{ value: "caliligos", label: "Caliligos - Trial" }],
    },
    {
        label: "Hanumatan",
        options: [{ value: "hanumatan", label: "Hanumatan - Trial" }],
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
