import { Loading } from "@components/Common/Loading";
import { RaidSummaryType } from "@type/RaidSummaryType";
import { fetchData } from "@utils/functions";
import { useEffect, useRef, useState } from "react";
import { RaidSummary } from "./RaidSummary";
import "./RaidSummary.css";

export function RaidSummaryContainer() {
    const [data, setData] = useState<RaidSummaryType[]>([]);
    const [displayedData, setDisplayedData] = useState<RaidSummaryType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [noResults, setNoResults] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchDataFromAPI = async (page: number = 1) => {
        try {
            const result = await fetchData("GET", `home?page=${page}`);
            return result;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
            const result = await fetchDataFromAPI();

            if (result.length <= 0) {
                setNoResults(true);
                setIsLoading(false);

                return;
            }

            setData(result);
            setDisplayedData(result.slice(0, 10));
            setIsLoading(false);
            setHasMore(result.length > 10);
            setPage(2);
        };

        fetchDataAsync();
    }, []);

    useEffect(() => {
        const loadMoreData = async () => {
            if (!hasMore) {
                const result = await fetchDataFromAPI(page);

                if (result.length <= 0) {
                    setNoResults(true);
                    setIsLoading(false);

                    return;
                }

                setData((prevData) => [...prevData, ...result]);
                setPage(page + 1);
            }

            const nextBatch = data.slice(
                displayedData.length,
                displayedData.length + 5
            );

            setDisplayedData((prevData) => [...prevData, ...nextBatch]);

            setHasMore(displayedData.length + 5 < data.length);

            setIsLoading(false);
        };

        if (isLoading || noResults) return;

        /* Intersection Observer */
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setIsLoading(true);

                    loadMoreData();
                }
            },
            { threshold: 1.0 }
        );

        const lastElement = document.querySelector("#scrollTarget");
        if (lastElement) observer.current.observe(lastElement);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [isLoading, hasMore, displayedData, data, page, noResults]);

    if (isLoading && data.length <= 0) return <Loading />;

    if (noResults && data.length >= 0)
        return <li className="text-center">No data to show.</li>;

    return (
        <>
            {displayedData.map((entry) => (
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
            {noResults && <li className="text-center">No more data to show.</li>}
            <div id="scrollTarget"></div>
        </>
    );
}
