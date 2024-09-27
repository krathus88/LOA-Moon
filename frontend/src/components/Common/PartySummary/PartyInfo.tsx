import { BossHpIcon } from "@components/Common/Icons/BossHpIcon";
import { DeathIcon } from "@components/Common/Icons/DeathIcon";
import { GearIcon } from "@components/Common/Icons/GearIcon";
import { DIFFICULTY_COLOR_MAP } from "@utils/constants/encounters";
import { ClearDateIcon } from "../Icons/ClearDateIcon";
import { ClearTimeIcon } from "../Icons/ClearTimeIcon";
import { ItemTooltip } from "../ItemTooltip";
import { WorldIcon } from "../Icons/WorldIcon";

type PartyInfoProps = {
    liKey: string;
    isHeightLarge: boolean;
    isWidthLarge: boolean;
    region: string;
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
    liKey,
    isHeightLarge,
    isWidthLarge,
    region,
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
                <span className="gate rounded-3">{gate}</span>
                {instance_name}
                <span
                    className="difficulty-s fw-light"
                    style={{ color: difficultyColor }}>
                    {" "}
                    [{difficulty}]
                </span>
            </h5>
            <small
                className="difficulty-l fw-light mb-1"
                style={{ color: difficultyColor }}>
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
                                <small className="fw-light tt-s-ilvl">
                                    {avg_ilvl !== null ? avg_ilvl : "N/A"} (
                                    {highest_ilvl})
                                </small>
                            </li>
                            <li style={{ color: "var(--boss-hp-color)" }}>
                                <BossHpIcon />{" "}
                                <small className="fw-light tt-s-boss-hp">
                                    {max_boss_hp}
                                </small>
                            </li>
                        </ul>
                    </div>
                )}
                <div>
                    <div className="region" style={{ color: "var(--region-color)" }}>
                        <WorldIcon />
                        <small className="fw-light"> {region}</small>
                    </div>
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
            <ItemTooltip anchorTo={`.${liKey} .tt-s-boss-hp`}>
                Boss Total HP
            </ItemTooltip>
            <ItemTooltip anchorTo={`.${liKey} .tt-s-ilvl`}>
                Average iLvl (Max iLvl)
            </ItemTooltip>
        </div>
    );
}
