import { getIcon } from "../../../utils/functions";

type PlayerProps = {
    iconId: number;
    engraving: string;
    name: string;
    dps: string;
    dps_percentage: number;
    type: string;
};

export function Player({
    iconId,
    engraving,
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
            className="player-row mb-1 rounded-3 shadow-lg"
            style={{
                borderColor: color,
                backgroundImage: `linear-gradient(to right, ${color} ${dps_percentage}%,  transparent 0%`,
            }}>
            <img src={getIcon(iconId)} alt={`Icon ${iconId}`} />
            <small className="name fw-light">
                {engraving} - {name}
            </small>
            <div className="ms-auto">
                <small className="dps fw-light">{dps}/s</small>
                <small className="dps-percentage fw-light">{dps_percentage}%</small>
            </div>
        </li>
    );
}
