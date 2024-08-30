import { getRaidWallpaper } from "../../../utils/functions";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Info } from "./Info";
import { PlayerData } from "./PlayerData";

type RaidSummaryProps = {
    encounter_id: number;
};

export function RaidSummary({ encounter_id }: RaidSummaryProps) {
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
            className="raid-summary pb-1 border shadow rounded-3 no-link"
            to={`/encounter/${encounter_id}`}
            ref={raidSummaryRef}>
            {/* Raid Wallpaper */}
            <img
                src={getRaidWallpaper("brelshaza")}
                alt=""
                className="raid-summary-background"></img>
            <Info isHeightLarge={isHeightLarge} isWidthLarge={isWidthLarge} />
            <PlayerData isHeightLarge={isHeightLarge} />
        </Link>
    );
}
