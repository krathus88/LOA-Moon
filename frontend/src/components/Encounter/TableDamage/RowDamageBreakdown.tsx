import { PlayerSkillDataType } from "@type/EncounterType";
import { getIconVariants } from "@utils/functions";
import { useState } from "react";

const color = "var(--skill-bg-image-color)";
const borderColor = "var(--skill-border-color)";
const hoverColor = "var(--skill-hover-color)";

type RowDamageBreakdownProps = {
    skill: PlayerSkillDataType;
};

export function RowDamageBreakdown({ skill }: RowDamageBreakdownProps) {
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
            <td className="text-center">{skill.dmg_total}</td>
            <td className="text-center">{skill.dps}</td>
            <td className="text-center">{skill.dmg_percentage}%</td>
            <td className="text-center">{skill.crit_percentage}%</td>
            <td className="text-center">{skill.front_attacks_percentage}%</td>
            <td className="text-center">{skill.back_attacks_percentage}%</td>
            <td className="text-center">{skill.casts}</td>
            <td className="text-center">{skill.cpm}</td>
        </tr>
    );
}
