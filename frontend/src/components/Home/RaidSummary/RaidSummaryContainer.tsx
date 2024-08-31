import { useState, useEffect, useCallback, useRef } from "react";
import { RaidSummary } from "./RaidSummary";
import "./RaidSummary.css";
import { Loading } from "@components/Common/Loading";
import { RaidSummaryType } from "@type/RaidSummaryType";

type RaidSummaryContainerProps = {
    data: RaidSummaryType[];
};

export function RaidSummaryContainer({ data }: RaidSummaryContainerProps) {
    const [displayedEntries, setDisplayedEntries] = useState<RaidSummaryType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Assuming more data might be available initially
    const observer = useRef<IntersectionObserver | null>(null);

    // Load the initial entries
    useEffect(() => {
        setDisplayedEntries(data.slice(0, 10));
    }, [data]);

    const loadMoreEntries = useCallback(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        const newEntries = data.slice(
            displayedEntries.length,
            displayedEntries.length + 5
        );
        setDisplayedEntries((prevEntries) => [...prevEntries, ...newEntries]);
        setIsLoading(false);
        setHasMore(newEntries.length > 0); // If no more data is available
    }, [data, displayedEntries, isLoading, hasMore]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        const options = {
            root: null, // viewport
            rootMargin: "0px",
            threshold: 1.0, // trigger when the target is fully visible
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreEntries();
            }
        }, options);

        const target = document.querySelector("#scrollTarget");
        if (target) {
            observer.current.observe(target);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [loadMoreEntries]);

    console.log(displayedEntries);

    return (
        <>
            {displayedEntries.map((entry) => (
                <li key={entry.encounter_id}>
                    <RaidSummary
                        encounter_id={entry.encounter_id}
                        instance_name={entry.instance_name}
                        gate={entry.gate}
                        difficulty={entry.difficulty}
                        clear_time={entry.clear_time}
                        fight_end_time={entry.fight_end}
                        max_boss_hp={entry.max_boss_hp}
                        max_boss_hp_bars={entry.max_boss_hp_bars}
                        avg_ilvl={entry.avg_ilvl}
                        highest_ilvl={entry.highest_ilvl}
                        death_count={entry.death_count}
                        player_data={entry.player_data}
                    />
                </li>
            ))}
            {isLoading && (
                <li>
                    <Loading />
                </li>
            )}
            {!hasMore && <p>No more entries to load</p>}
            <div id="scrollTarget"></div>
        </>
    );
}
