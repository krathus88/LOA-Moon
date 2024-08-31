import { PlayerDataType } from "@type/RaidSummaryType";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getRaidWallpaper } from "../../../utils/functions";
import { Info } from "./Info";
import { PlayerData } from "./PlayerData";

type RaidSummaryProps = {
    encounter_id: number;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end_time: string;
    max_boss_hp: string;
    max_boss_hp_bars: string | null;
    avg_ilvl: number;
    highest_ilvl: number;
    death_count: number;
    player_data: PlayerDataType[];
};

export function RaidSummary({
    encounter_id,
    instance_name,
    gate,
    difficulty,
    clear_time,
    fight_end_time,
    max_boss_hp,
    max_boss_hp_bars,
    avg_ilvl,
    highest_ilvl,
    death_count,
    player_data,
}: RaidSummaryProps) {
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
            className="raid-summary pb-1 shadow rounded-3 no-link"
            to={`/encounter/${encounter_id}`}
            ref={raidSummaryRef}>
            {/* Raid Wallpaper */}
            <img
                src={getRaidWallpaper(instance_name)}
                alt=""
                className="raid-summary-background"
            />
            <Info
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
                max_boss_hp_bars={max_boss_hp_bars}
            />
            <PlayerData
                isHeightLarge={isHeightLarge}
                max_boss_hp={max_boss_hp}
                max_boss_hp_bars={max_boss_hp_bars}
                avg_ilvl={avg_ilvl}
                highest_ilvl={highest_ilvl}
                death_count={death_count}
                player_data={player_data}
            />
        </Link>
    );
}
