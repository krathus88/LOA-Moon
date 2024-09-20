import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { DeathIcon } from "@components/Common/Icons/DeathIcon";

type PartyPlayerProps = {
    iconId: number;
    subclass: string;
    s_subclass: string | null;
    name: string | null;
    dps: string;
    dps_percentage: number;
    is_dead: boolean;
    type: string;
};

export function PartyPlayer({
    iconId,
    subclass,
    s_subclass,
    name,
    dps,
    dps_percentage,
    is_dead,
    type,
}: PartyPlayerProps) {
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
                {name ? (
                    <>
                        <span className="">{s_subclass}</span> {name}
                    </>
                ) : (
                    <span>{subclass}</span>
                )}
            </small>
            <div className="ms-auto">
                {is_dead && <DeathIcon />}
                <small className="dps fw-light">{dps}/s</small>
                <small className="dps-percentage fw-light">{dps_percentage}%</small>
            </div>
        </li>
    );
}
