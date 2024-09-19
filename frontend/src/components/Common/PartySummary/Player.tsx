import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { DeathIcon } from "@components/Common/Icons/DeathIcon";

type PlayerProps = {
    iconId: number;
    subclass: string;
    name: string;
    dps: string;
    dps_percentage: number;
    is_dead: boolean;
    type: string;
};

export function Player({
    iconId,
    subclass,
    name,
    dps,
    dps_percentage,
    is_dead,
    type,
}: PlayerProps) {
    /*   let color = "#5b2128";
    if (type === "supp") {
        color = "#184332";
    } */
    let color = "rgba(91, 33, 40, 0.85)";
    let borderColor = "rgba(91, 33, 40, 0.75)";
    if (type === "supp") {
        color = "rgba(255, 227, 201, 0.5)";
        borderColor = "rgba(255,227,201,0.2)";
    }

    return (
        <li
            className="player-row mb-1 rounded-3"
            style={{
                borderColor: borderColor,
                backgroundImage: `linear-gradient(to right, ${color} ${dps_percentage}%,  transparent ${
                    dps_percentage + 10
                }%`,
            }}>
            <img src={MAP_TO_IMAGE_CLASSES[iconId]} alt={`Icon ${iconId}`} />
            <small className="name fw-light">
                <span className="">{subclass}</span> {name}
            </small>
            <div className="ms-auto">
                {is_dead && <DeathIcon />}
                <small className="dps fw-light">{dps}/s</small>
                <small className="dps-percentage fw-light">{dps_percentage}%</small>
            </div>
        </li>
    );
}
