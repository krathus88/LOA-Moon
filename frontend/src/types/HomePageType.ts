export type PlayerDataType = {
    name: string;
    class_id: number;
    subclass: string;
    gear_score: number;
    dps: string;
    damage_percentage: number;
    character_id: number;
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
    p_name?: string;
    p_class?: string;
    p_spec?: string;
    encounter?: string;
    difficulty?: string;
    date_from?: string;
    date_until?: string;
    clear_time_from?: number;
    clear_time_until?: number;
};
