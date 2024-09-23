import { DeathIcon } from "@components/Common/Icons/DeathIcon";
import { EncounterPlayerDataType } from "@type/EncounterType";
import { PlayerRoleType } from "@type/GeneralType";
import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { useState } from "react";
import { TableDamageBreakdown } from "./TableDamageBreakdown";

type RowDamageProps = {
    hasDeathCount: boolean;
    type: PlayerRoleType;
    playerData: EncounterPlayerDataType;
};

export function RowDamage({ type, hasDeathCount, playerData }: RowDamageProps) {
    let color = "var(--dps-bg-color)";
    let borderColor = "var(--dps-border-color)";
    let hoverColor = "var(--dps-hover-color)";
    if (type === "supp") {
        color = "var(--supp-bg-color)";
        borderColor = "var(--supp-border-color)";
        hoverColor = "var(--supp-hover-color)";
    }

    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleRowClick = () => {
        setIsExpanded(!isExpanded); // Toggle expanded state
    };

    return (
        <>
            <tr
                className={`fw-light ${type}`}
                style={{
                    borderColor: borderColor,
                    backgroundImage: `linear-gradient(to right, ${
                        isHovered ? hoverColor : color
                    } ${playerData.dmg_percentage}%,  transparent ${
                        playerData.dmg_percentage + 1.5
                    }%)`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <td>
                    <div className="name-container" onClick={handleRowClick}>
                        <img
                            src={MAP_TO_IMAGE_CLASSES[playerData.class_id]}
                            alt={`Icon ${playerData.class_id}`}
                        />
                        <small className="me-1">{playerData.gear_score}</small>
                        <small className="name fw-light">
                            {playerData.name ? (
                                <>
                                    <p className="subclass">{playerData.s_subclass}</p>
                                    <p>&nbsp;{playerData.name}</p>
                                </>
                            ) : (
                                <p className="subclass">{playerData.subclass}</p>
                            )}
                        </small>
                        <div className="ms-auto">
                            {playerData.is_dead && <DeathIcon />}
                        </div>
                    </div>
                </td>
                <td className="text-center">{playerData.death_timer}s</td>
                {hasDeathCount && (
                    <td className="text-center">{playerData.death_count}</td>
                )}
                <td className="text-center">{playerData.dmg_total}</td>
                <td className="text-center">{playerData.dps}</td>
                <td className="text-center">{playerData.dmg_percentage}%</td>
                <td className="text-center">{playerData.crit_percentage}%</td>
                <td className="text-center">
                    {playerData.dmg_front_attacks_percentage}%
                </td>
                <td className="text-center">
                    {playerData.dmg_back_attacks_percentage}%
                </td>
                <td className="text-center">{playerData.counters}</td>
            </tr>
            {isExpanded && (
                <tr>
                    <td colSpan={12}>
                        <TableDamageBreakdown skillData={playerData.skill_data} />
                    </td>
                </tr>
            )}
        </>
    );
}
