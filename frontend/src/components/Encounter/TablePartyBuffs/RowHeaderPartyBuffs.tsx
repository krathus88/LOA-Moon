import { ItemTooltip } from "@components/Common/ItemTooltip";
import { EncounterSynergyDataType } from "@type/EncounterType";
import { getIconVariants } from "@utils/functions";
import DOMPurify from "dompurify";
import { useState } from "react";

type RowHeaderPartyBuffsProps = {
    keyValue: string;
    synergy: EncounterSynergyDataType;
};

export function RowHeaderPartyBuffs({ keyValue, synergy }: RowHeaderPartyBuffsProps) {
    const iconVariants = getIconVariants(synergy.img_src);
    const [currentIconIndex, setCurrentIconIndex] = useState(0); // Track current icon variant

    // Function to handle error and retry with the next variant
    const handleImgError = () => {
        if (currentIconIndex < iconVariants.length - 1) {
            setCurrentIconIndex(currentIconIndex + 1); // Move to next variant on error
        }
    };

    return (
        <th className={`text-center ${keyValue}`}>
            <img
                className={`rounded tt-${synergy.type}`}
                src={iconVariants[currentIconIndex]}
                alt={`${synergy.type}`}
                onError={handleImgError} // On error, try next variant
            />
            <ItemTooltip anchorTo={`.${keyValue} .tt-${synergy.type}`}>
                <span className="fw-normal">{synergy.source}</span>
                <br />
                <span
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(synergy.description),
                    }}
                />
            </ItemTooltip>
        </th>
    );
}
