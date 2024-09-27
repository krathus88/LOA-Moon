export type EncounterTableType = "damage" | "partyBuffs";

export type EncounterSynergyDataType = {
    source: string;
    type: string;
    description: string;
    img_src: string;
    data: number[];
};

export type PlayerSkillDataType = {
    name: string;
    img_src: string;
    dps: string;
    dmg_total: string;
    dmg_total_raw: number;
    dmg_percentage: number;
    crit_percentage: number;
    front_attacks_percentage: number;
    back_attacks_percentage: number;
    dmg_supp_brand_percentage: number;
    dmg_supp_ap_percentage: number;
    dmg_supp_identity_percentage: number;
    casts: number;
    cpm: number;
    synergy_data: number[];
};

export type CardsDataType = {
    name: string;
    img_src: string;
    draws: number;
    draw_percentage: number;
    display_percentage: number;
};

export type ArcanaCardsDataType = {
    total_cards_drawn: number;
    draws_per_min: number;
    cards_data: CardsDataType[];
};

export type EncounterPlayerDataType = {
    name: string | null;
    class_id: number;
    subclass: string;
    s_subclass: string | null;
    gear_score: number;
    counters: number;
    dps: string;
    dmg_total: string;
    dmg_total_raw: number;
    dmg_percentage: number;
    crit_percentage: number;
    dmg_front_attacks_percentage: number;
    dmg_back_attacks_percentage: number;
    dmg_supp_brand_percentage: number;
    dmg_supp_ap_percentage: number;
    dmg_supp_identity_percentage: number;
    is_dead: boolean;
    death_timer: number;
    death_count: number;
    party_num: number;
    synergy_data: number[];
    skills_data: PlayerSkillDataType[];
    arcana_cards_data: ArcanaCardsDataType | null;
};

export type EncounterEstherDataType = any;

export type EncounterType = {
    region: string;
    encounter_id: number;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end: string;
    total_damage: string;
    total_dps: string;
    max_boss_hp: string;
    avg_ilvl: number;
    highest_ilvl: number;
    num_parties: number;
    synergy_data: EncounterSynergyDataType[][];
    player_data: EncounterPlayerDataType[];
    esther_data: EncounterEstherDataType[] | null;
};
