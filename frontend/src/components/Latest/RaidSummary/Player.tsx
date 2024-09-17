import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";

type PlayerProps = {
    iconId: number;
    subclass: string;
    name: string;
    dps: string;
    dps_percentage: number;
    type: string;
};

export function Player({
    iconId,
    subclass,
    name,
    dps,
    dps_percentage,
    type,
}: PlayerProps) {
    let color = "#5b2128";
    if (type === "supp") {
        color = "#184332";
    }

    return (
        <li
            className="player-row mb-1 rounded-3"
            style={{
                borderColor: color,
                backgroundImage: `linear-gradient(to right, ${color} ${dps_percentage}%,  transparent ${
                    dps_percentage + 10
                }%`,
            }}>
            <img src={MAP_TO_IMAGE_CLASSES[iconId]} alt={`Icon ${iconId}`} />
            <small className="name fw-light">
                <span className="fw-bold" style={{ color: "#87CEEB" }}>
                    {subclass}
                </span>{" "}
                {name}
            </small>
            <div className="ms-auto">
                <small className="dps fw-light">{dps}/s</small>
                <small className="dps-percentage fw-light">{dps_percentage}%</small>
            </div>
        </li>
    );
}
