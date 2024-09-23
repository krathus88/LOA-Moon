import { PlayerDataType } from "@type/EncounterPreviewType";
import { MAP_TO_IMAGE_RAIDS } from "@utils/constants/general";
import { Link } from "react-router-dom";
import { ClassInfo } from "./ClassInfo";
import { ClassPlayerData } from "./ClassPlayerData";

type ClassSummaryProps = {
    position: number;
    encounter_id: number;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end_time: string;
    max_boss_hp: string;
    avg_ilvl: number;
    highest_ilvl: number;
    death_count: number;
    player_data: PlayerDataType;
};

export function ClassSummary({
    position,
    encounter_id,
    instance_name,
    gate,
    difficulty,
    clear_time,
    fight_end_time,
    max_boss_hp,
    avg_ilvl,
    highest_ilvl,
    death_count,
    player_data,
}: ClassSummaryProps) {
    const isHeightLarge = false;

    return (
        <Link
            className="c-raid-summary pb-1 shadow rounded-3 no-link"
            to={`/encounter/${encounter_id}`}>
            {/* Raid Wallpaper */}
            <img
                src={MAP_TO_IMAGE_RAIDS[instance_name]}
                alt={instance_name}
                className="raid-summary-background"
            />
            <ClassInfo
                position={position}
                instance_name={instance_name}
                gate={gate}
                difficulty={difficulty}
                clear_time={clear_time}
                fight_end_time={fight_end_time}
            />
            <ClassPlayerData
                position={position}
                isHeightLarge={isHeightLarge}
                max_boss_hp={max_boss_hp}
                avg_ilvl={avg_ilvl}
                highest_ilvl={highest_ilvl}
                death_count={death_count}
                player_data={player_data}
            />
        </Link>
    );
}
