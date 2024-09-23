import { ClearDateIcon } from "@components/Common/Icons/ClearDateIcon";
import { DIFFICULTY_COLOR_MAP } from "@utils/constants/encounters";

type EncounterInfoProps = {
    difficulty: string;
    instance_name: string;
    gate: string;
    fight_end: string;
};

export function EncounterInfo({
    difficulty,
    instance_name,
    gate,
    fight_end,
}: EncounterInfoProps) {
    const difficultyColor =
        DIFFICULTY_COLOR_MAP.get(difficulty) || "rgb(222, 226, 230)";

    return (
        <div className="border-bottom" id="EncounterInfo">
            <div className="d-flex align-items-center">
                <h4>
                    <span className="rounded-3 gate">{gate}</span>
                    <span style={{ color: difficultyColor }}>[{difficulty}]</span>{" "}
                    {instance_name}
                </h4>
            </div>
            <div>
                <ClearDateIcon />
                <h5>{fight_end}</h5>
            </div>
        </div>
    );
}
