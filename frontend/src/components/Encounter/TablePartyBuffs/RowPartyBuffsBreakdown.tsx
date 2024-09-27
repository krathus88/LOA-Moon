import { PlayerSkillDataType } from "@type/EncounterType";
import { getIconVariants } from "@utils/functions";
import { useState } from "react";

const color = "var(--skill-bg-image-color)";
const borderColor = "var(--skill-border-color)";
const hoverColor = "var(--skill-hover-color)";

type RowPartyBuffsBreakdownProps = {
    skill: PlayerSkillDataType;
};

export function RowPartyBuffsBreakdown({ skill }: RowPartyBuffsBreakdownProps) {
    const [isHovered, setIsHovered] = useState(false);

    const iconVariants = getIconVariants(skill.img_src);
    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    const handleError = () => {
        if (currentIconIndex < iconVariants.length - 1) {
            setCurrentIconIndex(currentIconIndex + 1); // Move to next variant on error
        } else {
            console.warn(`All icon attempts failed for ${skill.img_src}`);
        }
    };

    return (
        <tr
            className="fw-light"
            style={{
                borderColor: borderColor,
                backgroundImage: `linear-gradient(to right, ${
                    isHovered ? hoverColor : color
                } ${skill.dmg_percentage}%,  transparent ${
                    skill.dmg_percentage + 1.5
                }%)`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <td>
                <div className="skill-name-container">
                    <img
                        className="rounded"
                        src={iconVariants[currentIconIndex]}
                        alt={`Icon`}
                        onError={handleError}
                    />
                    <small className="name fw-light">{skill.name}</small>
                </div>
            </td>
            {skill.synergy_data.map((synergyValue: number, index: number) => (
                <td key={index} className="text-center">
                    {synergyValue > 0 && `${synergyValue}%`}
                </td>
            ))}
        </tr>
    );
}
