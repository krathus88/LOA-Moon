import { BossHpIcon } from "@components/Common/Icons/BossHpIcon";
import { DeathIcon } from "@components/Common/Icons/DeathIcon";
import { GearIcon } from "@components/Common/Icons/GearIcon";
import { PlayerDataType } from "@type/EncounterPreviewType";
import { ClassPlayer } from "./ClassPlayer";

type ClassPlayerDataProps = {
    position: number;
    isHeightLarge: boolean;
    max_boss_hp: string;
    avg_ilvl: number;
    highest_ilvl: number;
    death_count: number;
    player_data: PlayerDataType;
};

export function ClassPlayerData({
    position,
    isHeightLarge,
    max_boss_hp,
    avg_ilvl,
    highest_ilvl,
    death_count,
    player_data,
}: ClassPlayerDataProps) {
    return (
        <div
            className="player-data"
            style={{ marginTop: isHeightLarge ? "0.5rem" : undefined }}>
            {/* Header Bar */}
            <div className={`head ${isHeightLarge ? "hidden-i" : ""}`}>
                <small style={{ color: "#ff9797" }}>
                    <BossHpIcon />
                    <small className="fw-light"> {max_boss_hp}</small>
                </small>
                <small>
                    <GearIcon />
                    <small className="fw-light">
                        {" "}
                        {avg_ilvl !== null ? avg_ilvl : "N/A"} ({highest_ilvl})
                    </small>
                </small>
                <small>
                    <DeathIcon />
                    <small> {death_count}</small>
                </small>
            </div>
            <div className="c-container">
                <ClassPlayer
                    position={position}
                    iconId={player_data.class_id}
                    subclass={player_data.subclass}
                    name={player_data.name}
                    dps_raw={player_data.dps_raw}
                    gear_score={player_data.gear_score}
                    is_dead={player_data.is_dead}
                />
            </div>
        </div>
    );
}
