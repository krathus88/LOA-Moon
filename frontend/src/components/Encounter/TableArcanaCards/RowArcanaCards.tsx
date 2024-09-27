import { CardsDataType } from "@type/EncounterType";
import { getIconVariants } from "@utils/functions";
import { useRef, useState } from "react";

const color = "var(--arcana-bg-image-color)";
const borderColor = "var(--arcana-border-color)";
const hoverColor = "var(--arcana-hover-color)";

type RowArcanaCardsProps = {
    card: CardsDataType;
};

export function RowArcanaCards({ card }: RowArcanaCardsProps) {
    const [isHovered, setIsHovered] = useState(false);

    const iconVariants = getIconVariants(card.img_src);
    const [currentSrc, setCurrentSrc] = useState(iconVariants[0]);
    const attemptRef = useRef(0);

    const handleError = () => {
        if (attemptRef.current < iconVariants.length - 1) {
            attemptRef.current += 1; // Move to the next variant
            setCurrentSrc(iconVariants[attemptRef.current]); // Update currentSrc to the next variant
        } else {
            console.warn(`All icon attempts failed for ${card.img_src}`);
        }
    };

    return (
        <tr
            className="fw-light"
            style={{
                borderColor: borderColor,
                backgroundImage: `linear-gradient(to right, ${
                    isHovered ? hoverColor : color
                } ${card.display_percentage}%,  transparent ${
                    card.display_percentage + 1
                }%)`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <td>
                <div className="skill-name-container">
                    <img
                        className="rounded"
                        src={currentSrc}
                        alt={`Icon ${card.name}`}
                        onError={handleError}
                    />
                    <small className="name fw-light">{card.name}</small>
                </div>
            </td>
            <td className="text-center">{card.draws}</td>
            <td className="text-center">{card.draw_percentage} %</td>
        </tr>
    );
}
