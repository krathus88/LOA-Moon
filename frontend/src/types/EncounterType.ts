export type EncounterTableType = "damage" | "partyBuffs" | "selfBuffs" | "shields";

export type PlayerSkillDataType = any;

export type EncounterPlayerDataType = {
    name: string | null;
    class_id: number;
    subclass: string;
    s_subclass: string | null;
    gear_score: number;
    counters: number;
    dps: string;
    dmg_total: string;
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
    skill_data: PlayerSkillDataType[];
    buffs_data: any;
    debuffs_data: any;
    shields_data: any;
    absorbs_data: any;
};

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
    death_count: number;
    player_data: EncounterPlayerDataType[];
};
