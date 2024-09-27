import { DIFFICULTY_COLOR_MAP } from "@utils/constants/encounters";
import { ClearTimeIcon } from "../Icons/ClearTimeIcon";
import { ClearDateIcon } from "../Icons/ClearDateIcon";
import { WorldIcon } from "../Icons/WorldIcon";

type ClassInfoProps = {
    position: number;
    region: string;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end_time: string;
};

export function ClassInfo({
    position,
    region,
    instance_name,
    gate,
    difficulty,
    clear_time,
    fight_end_time,
}: ClassInfoProps) {
    const difficultyColor =
        DIFFICULTY_COLOR_MAP.get(difficulty) || "rgb(222, 226, 230)"; // Default to white if not found

    return (
        <div className="info">
            <h5>
                <span className="rounded-3">{gate}</span>
                {instance_name}
                <small className="fw-light" style={{ color: difficultyColor }}>
                    &nbsp;[{difficulty}]
                </small>
            </h5>
            <div className="header-bar mt-auto mb-1">
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
            <div className="small-region-position">
                <div className="ms-auto region">
                    <WorldIcon />
                    <p>{region}</p>
                </div>
                <div className="position">
                    <p># {position}</p>
                </div>
            </div>
        </div>
    );
}
