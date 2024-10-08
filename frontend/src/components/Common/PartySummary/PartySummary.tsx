import { PlayerDataType } from "@type/EncounterPreviewType";
import { MAP_TO_IMAGE_RAIDS } from "@utils/constants/general";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PartyInfo } from "./PartyInfo";
import { PartyPlayerData } from "./PartyPlayerData";

type PartySummaryProps = {
    liKey: string;
    encounter_id: number;
    region: string;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end_time: string;
    max_boss_hp: string;
    avg_ilvl: number;
    highest_ilvl: number;
    death_count: number;
    player_data: PlayerDataType[];
};

export function PartySummary({
    liKey,
    encounter_id,
    region,
    instance_name,
    gate,
    difficulty,
    clear_time,
    fight_end_time,
    max_boss_hp,
    avg_ilvl,
    highest_ilvl,
    death_count,
    player_data,
}: PartySummaryProps) {
    const [isHeightLarge, setIsHeightLarge] = useState(false);
    const [isWidthLarge, setIsWidthLarge] = useState(true);
    const raidSummaryRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        const checkHeight = () => {
            if (raidSummaryRef.current) {
                const height = raidSummaryRef.current.clientHeight;
                setIsHeightLarge(height > 250);

                const width = raidSummaryRef.current.clientWidth;
                setIsWidthLarge(width >= 647);
            }
        };

        checkHeight(); // Check on mount
        window.addEventListener("resize", checkHeight);

        // Clean up listener on unmount
        return () => {
            window.removeEventListener("resize", checkHeight);
        };
    }, []);

    return (
        <Link
            className={`raid-summary pb-1 shadow rounded-3 no-link ${liKey}`}
            to={`/encounter/${encounter_id}`}
            ref={raidSummaryRef}>
            {/* Raid Wallpaper */}
            <img
                src={MAP_TO_IMAGE_RAIDS[instance_name]}
                alt=""
                className="raid-summary-background"
            />
            <PartyInfo
                liKey={liKey}
                isHeightLarge={isHeightLarge}
                isWidthLarge={isWidthLarge}
                region={region}
                instance_name={instance_name}
                gate={gate}
                difficulty={difficulty}
                clear_time={clear_time}
                fight_end_time={fight_end_time}
                death_count={death_count}
                avg_ilvl={avg_ilvl}
                highest_ilvl={highest_ilvl}
                max_boss_hp={max_boss_hp}
            />
            <PartyPlayerData
                liKey={liKey}
                region={region}
                isHeightLarge={isHeightLarge}
                max_boss_hp={max_boss_hp}
                avg_ilvl={avg_ilvl}
                highest_ilvl={highest_ilvl}
                death_count={death_count}
                player_data={player_data}
            />
        </Link>
    );
}
