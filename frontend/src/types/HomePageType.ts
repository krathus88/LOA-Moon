export type PlayerDataType = {
    name: string | null;
    class_id: number;
    subclass: string;
    s_subclass: string | null;
    dps: string;
    dps_raw: number;
    damage_percentage: number;
    gear_score: number;
    is_dead: boolean;
    death_timer: number;
    death_count: number;
    party_num: number;
    flagged: boolean;
};

export type RaidSummaryType = {
    encounter_id: number;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end: string;
    max_boss_hp: string;
    avg_ilvl: number;
    highest_ilvl: number;
    death_count: number;
    player_data: PlayerDataType[];
};

export type FiltersType = {
    p_name: string;
    p_class_id: number;
    p_spec: string;
    encounter: string;
    difficulty: string;
    date_from: string;
    date_until: string;
    order_by: string;
};

export type FiltersSourceType = "p-latest" | "p-class" | "p-party";
