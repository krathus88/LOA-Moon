import { DIFFICULTY_COLOR_MAP } from "@utils/constants/encounters";
import { DeathIcon } from "@components/Common/Icons/DeathIcon";
import { GearIcon } from "@components/Common/Icons/GearIcon";
import { BossHpIcon } from "@components/Common/Icons/BossHpIcon";
import { ClearTimeIcon } from "../Icons/ClearTimeIcon";
import { ClearDateIcon } from "../Icons/ClearDateIcon";

type PartyInfoProps = {
    isHeightLarge: boolean;
    isWidthLarge: boolean;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end_time: string;
    death_count: number;
    avg_ilvl: number | null;
    highest_ilvl: number;
    max_boss_hp: string;
};

export function PartyInfo({
    isHeightLarge,
    isWidthLarge,
    instance_name,
    gate,
    difficulty,
    clear_time,
    fight_end_time,
    death_count,
    avg_ilvl,
    highest_ilvl,
    max_boss_hp,
}: PartyInfoProps) {
    const difficultyColor =
        DIFFICULTY_COLOR_MAP.get(difficulty) || "rgb(222, 226, 230)"; // Default to white if not found

    return (
        <div className="info">
            <h5>
                <span className="rounded-3">{gate}</span>
                {instance_name}
            </h5>
            <small className="fw-light mb-1" style={{ color: difficultyColor }}>
                {difficulty}
            </small>
            <div className="mt-auto mb-1">
                {(isHeightLarge || !isWidthLarge) && (
                    <div>
                        <ul>
                            <li>
                                <DeathIcon />{" "}
                                <small className="fw-light">{death_count}</small>
                            </li>
                            <li>
                                <GearIcon />{" "}
                                <small className="fw-light">
                                    {avg_ilvl !== null ? avg_ilvl : "N/A"} (
                                    {highest_ilvl})
                                </small>
                            </li>
                            <li style={{ color: "var(--boss-hp-color)" }}>
                                <BossHpIcon />{" "}
                                <small className="fw-light">{max_boss_hp}</small>
                            </li>
                        </ul>
                    </div>
                )}
                <div>
                    <div style={{ color: "var(--clear-time-color)" }}>
                        <ClearTimeIcon />
                        <small className="fw-light"> {clear_time}</small>
                    </div>
                    <div style={{ color: "var(--clear-date-color)" }}>
                        <ClearDateIcon />
                        <small className="fw-light"> {fight_end_time}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
