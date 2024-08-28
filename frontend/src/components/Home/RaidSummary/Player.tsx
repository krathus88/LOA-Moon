import { getIcon } from "@globals/functions";

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
            className="mb-1 rounded-3 shadow-lg"
            style={{
                borderColor: color,
                backgroundImage: `linear-gradient(to right, ${color} ${dps_percentage}%,  transparent 0%`,
            }}>
            <img src={getIcon(iconId)} alt={`Icon ${iconId}`} />
            <p>
                {engraving}
                <span className="fw-light"> | </span>
                {name}
            </p>
            <p className="ms-auto">{dps}/s</p>
            <p className="ms-2">{dps_percentage}%</p>
        </li>
    );
}
