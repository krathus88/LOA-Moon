import { PlayerDataType } from "@type/HomePageType";
import { MAP_TO_IMAGE_RAIDS } from "@utils/constants/general";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ClassInfo } from "./ClassInfo";
import { ClassPlayerData } from "./ClassPlayerData";

type ClassSummaryProps = {
    position: number;
    encounter_id: number;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end_time: string;
    max_boss_hp: string;
    avg_ilvl: number;
    highest_ilvl: number;
    death_count: number;
    player_data: PlayerDataType;
};

export function ClassSummary({
    position,
    encounter_id,
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
}: ClassSummaryProps) {
    const isHeightLarge = false;
    const [isWidthLarge, setIsWidthLarge] = useState(true);
    const raidSummaryRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        const checkHeight = () => {
            if (raidSummaryRef.current) {
                const width = raidSummaryRef.current.clientWidth;
                setIsWidthLarge(width >= 569);
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
            className="c-raid-summary pb-1 shadow rounded-3 no-link"
            to={`/encounter/${encounter_id}`}
            ref={raidSummaryRef}>
            {/* Raid Wallpaper */}
            <img
                src={MAP_TO_IMAGE_RAIDS[instance_name]}
                alt=""
                className="raid-summary-background"
            />
            <ClassInfo
                isHeightLarge={isHeightLarge}
                isWidthLarge={isWidthLarge}
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
            <ClassPlayerData
                position={position}
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
