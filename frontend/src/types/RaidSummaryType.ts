export type PlayerDataType = {
    name: string;
    class_id: number;
    subclass: string | null;
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
    max_boss_hp_bars: string;
    avg_ilvl: number;
    highest_ilvl: number;
    death_count: number;
    player_data: PlayerDataType[];
};
