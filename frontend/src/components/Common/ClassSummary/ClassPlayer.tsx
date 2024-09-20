import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { DeathIcon } from "@components/Common/Icons/DeathIcon";
import { GearIcon } from "../Icons/GearIcon";

type ClassPlayerProps = {
    position: number;
    iconId: number;
    subclass: string;
    name: string | null;
    dps_raw: number;
    gear_score: number;
    is_dead: boolean;
};

export function ClassPlayer({
    position,
    iconId,
    subclass,
    name,
    dps_raw,
    gear_score,
    is_dead,
}: ClassPlayerProps) {
    return (
        <div className="c-player-row rounded-3">
            <div className="c-player-start">
                <h5># {position + 1}</h5>
                <img src={MAP_TO_IMAGE_CLASSES[iconId]} alt={`Icon ${iconId}`} />
                <div className="name-container fw-light">
                    {name ? (
                        <div>
                            <p>{name}</p>
                            <small className="subclass">{subclass}</small>
                        </div>
                    ) : (
                        <p className="subclass">{subclass}</p>
                    )}
                </div>
            </div>
            <div className="c-player-end-container">
                <div className="c-player-mid fw-light">
                    <GearIcon />
                    <p>{gear_score}</p>
                </div>
                <p className="dps">{dps_raw.toLocaleString("en-US")}/s</p>
                <div className="death-container">{is_dead && <DeathIcon />}</div>
            </div>
        </div>
    );
}
