import { DIFFICULTY_COLOR_MAP } from "@utils/constants/encounters";
import { DeathIcon } from "@components/Common/Icons/DeathIcon";
import { GearIcon } from "@components/Common/Icons/GearIcon";
import { BossHpIcon } from "@components/Common/Icons/BossHpIcon";

type InfoProps = {
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

export function Info({
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
}: InfoProps) {
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
                            <li style={{ color: "#ff9797" }}>
                                <BossHpIcon />{" "}
                                <small className="fw-light">{max_boss_hp}</small>
                            </li>
                        </ul>
                    </div>
                )}
                <div>
                    <div style={{ color: "#bbffbb" }}>
                        <svg
                            width="13"
                            height="13"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fass"
                            data-icon="clock"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256v12.8l10.7 7.1 96 64 20 13.3 26.6-39.9-20-13.3L280 243.2V120 96H232v24z"></path>
                        </svg>{" "}
                        <small className="fw-light">{clear_time}</small>
                    </div>
                    <div style={{ color: "#97dfff" }}>
                        <svg
                            width="13"
                            height="13"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fass"
                            data-icon="calendar"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path
                                fill="currentColor"
                                d="M96 0V64H0v96H448V64H352V0H288V64H160V0H96zM448 192H0V512H448V192z"></path>
                        </svg>{" "}
                        <small className="fw-light">{fight_end_time}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
