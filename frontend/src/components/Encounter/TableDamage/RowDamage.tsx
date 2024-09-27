import { DeathIcon } from "@components/Common/Icons/DeathIcon";
import { EncounterPlayerDataType } from "@type/EncounterType";
import { PlayerRoleType } from "@type/GeneralType";
import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { useState } from "react";
import { InfoIcon } from "@components/Common/Icons/InfoIcon";
import { TableDamageBreakdown } from "./TableDamageBreakdown";
import { TableArcanaCards } from "../TableArcanaCards/TableArcanaCards";
import { ItemTooltip } from "@components/Common/ItemTooltip";

type RowDamageProps = {
    keyValue: string;
    hasDeathCount: boolean;
    type: PlayerRoleType;
    playerData: EncounterPlayerDataType;
};

export function RowDamage({
    keyValue,
    type,
    hasDeathCount,
    playerData,
}: RowDamageProps) {
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
                            alt={`Icon`}
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
                <td className="text-center">
                    {playerData.death_timer ? `${playerData.death_timer}s` : ""}
                </td>
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
                <tr
                    className="table-damage-breakdown-row"
                    style={{
                        borderColor: borderColor,
                    }}>
                    <td colSpan={12}>
                        <div>
                            <div className="info-breakdown fw-light">
                                <InfoIcon />
                                <small>
                                    &nbsp;Skill Breakdown refers to hits p/skill.
                                </small>
                            </div>
                            <TableDamageBreakdown skillData={playerData.skills_data} />
                        </div>
                        {playerData.arcana_cards_data && (
                            <div>
                                <div className="arcana-info-breakdown">
                                    <p>Card Draw Distribution</p>
                                    <small className="fw-light">
                                        Total Cards Drawn:{" "}
                                        {playerData.arcana_cards_data.total_cards_drawn}
                                    </small>
                                    <small className="fw-light">
                                        Draws per min:{" "}
                                        {playerData.arcana_cards_data.draws_per_min}{" "}
                                        cards/min
                                    </small>
                                </div>
                                <TableArcanaCards
                                    cardData={playerData.arcana_cards_data.cards_data}
                                />
                            </div>
                        )}
                    </td>
                </tr>
            )}
        </>
    );
}
