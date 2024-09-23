import { PartyPlayer } from "./PartyPlayer";
import { chunkArrayIntoParties } from "@utils/functions";
import { getPlayerType } from "@utils/functions";
import { PlayerDataType } from "@type/EncounterPreviewType";
import { BossHpIcon } from "@components/Common/Icons/BossHpIcon";
import { GearIcon } from "@components/Common/Icons/GearIcon";
import { DeathIcon } from "@components/Common/Icons/DeathIcon";

type PartyPlayerDataProps = {
    isHeightLarge: boolean;
    max_boss_hp: string;
    avg_ilvl: number;
    highest_ilvl: number;
    death_count: number;
    player_data: PlayerDataType[];
};

export function PartyPlayerData({
    isHeightLarge,
    max_boss_hp,
    avg_ilvl,
    highest_ilvl,
    death_count,
    player_data,
}: PartyPlayerDataProps) {
    const playerChunks = chunkArrayIntoParties(player_data, 4);

    return (
        <div
            className="player-data"
            style={{ marginTop: isHeightLarge ? "0.5rem" : undefined }}>
            {/* Header Bar */}
            <div className={`head ${isHeightLarge ? "hidden-i" : ""}`}>
                <small style={{ color: "var(--boss-hp-color)" }}>
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
            {/* Player Containers */}
            <div className="containers">
                {playerChunks.map((chunk, index) => (
                    <ul key={index}>
                        {chunk.map((player, playerIndex) => (
                            <PartyPlayer
                                key={playerIndex}
                                iconId={player.class_id}
                                subclass={player.subclass}
                                s_subclass={player.s_subclass}
                                name={player.name}
                                dps={player.dps}
                                dps_percentage={player.damage_percentage}
                                is_dead={player.is_dead}
                                type={getPlayerType(player.class_id)}
                            />
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}
