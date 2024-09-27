import { DeathIcon } from "@components/Common/Icons/DeathIcon";
import { ItemTooltip } from "@components/Common/ItemTooltip";
import { EncounterPlayerDataType, EncounterSynergyDataType } from "@type/EncounterType";
import { PlayerRoleType } from "@type/GeneralType";
import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { useState } from "react";
import { TablePartyBuffsBreakdown } from "./TablePartyBuffsBreakdown";

type RowPartyBuffsProps = {
    keyValue: string;
    type: PlayerRoleType;
    playerData: EncounterPlayerDataType;
    synergyData: EncounterSynergyDataType[];
    partyNum: number;
};

export function RowPartyBuffs({
    keyValue,
    type,
    playerData,
    synergyData,
    partyNum,
}: RowPartyBuffsProps) {
    let color = "var(--dps-bg-image-color)";
    let borderColor = "var(--dps-border-color)";
    let hoverColor = "var(--dps-hover-color)";
    if (type === "supp") {
        color = "var(--supp-bg-image-color)";
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
                className={`fw-light ${type} ${keyValue}`}
                style={{
                    borderColor: borderColor,
                    backgroundImage: `linear-gradient(to right, ${
                        isHovered ? hoverColor : color
                    } ${playerData.dmg_percentage}%,  transparent ${
                        playerData.dmg_percentage + 1.5
                    }%)`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleRowClick}>
                <td>
                    <div className="name-container">
                        <img
                            src={MAP_TO_IMAGE_CLASSES[playerData.class_id]}
                            alt={`Icon ${playerData.class_id}`}
                        />
                        <small className="me-1">{playerData.gear_score}</small>
                        <small className="name fw-light">
                            {playerData.name ? (
                                <>
                                    <p className="subclass tt-s-subclass">
                                        {playerData.s_subclass}
                                    </p>
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
                    <ItemTooltip anchorTo={`.${keyValue} .tt-s-subclass`}>
                        {playerData.subclass}
                    </ItemTooltip>
                </td>
                {playerData.synergy_data.map((synergyValue: number, index: number) => (
                    <td key={index} className="text-center">
                        {synergyValue}%
                    </td>
                ))}
            </tr>
            {isExpanded && (
                <tr
                    className="table-damage-breakdown-row"
                    style={{
                        borderColor: borderColor,
                    }}>
                    <td colSpan={12}>
                        <div className="mt-1">
                            <TablePartyBuffsBreakdown
                                skillData={playerData.skills_data}
                                synergyData={synergyData}
                                partyNum={partyNum}
                            />
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}
