import { getRaidWallpaper } from "@globals/functions";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Info } from "./Info";
import { PlayerData } from "./PlayerData";

export function RaidSummary() {
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
                console.log(width);
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
            to="/tab1"
            ref={raidSummaryRef}>
            {/* Raid Wallpaper */}
            <img
                src={getRaidWallpaper("brelshaza")}
                alt="Background Raid Image"
                className="raid-summary-background"></img>
            <Info isHeightLarge={isHeightLarge} isWidthLarge={isWidthLarge} />
            <PlayerData isHeightLarge={isHeightLarge} />
        </Link>
    );
}
