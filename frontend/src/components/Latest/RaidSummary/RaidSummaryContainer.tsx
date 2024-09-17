import { Loading } from "@components/Common/Loading";
import { api } from "@config/axios";
import { FiltersType, RaidSummaryType } from "@type/HomePageType";
import { toQueryString } from "@utils/functions";
import { useCallback, useEffect, useRef, useState } from "react";
import { RaidSummary } from "./RaidSummary";
import "./RaidSummary.css";

type RaidSummaryContainerProps = {
    filters: Partial<FiltersType>;
    isLoading: boolean;
    data: RaidSummaryType[];
    dataLength: number;
    displayedData: RaidSummaryType[];
    noResults: boolean;
    setIsLoading: (loading: boolean) => void;
    setData: (data: RaidSummaryType[]) => void;
    setDataLength: (dataLength: number | ((prevDataLength: number) => number)) => void;
    setDisplayedData: (
        displayedData:
            | RaidSummaryType[]
            | ((prevDisplayedData: RaidSummaryType[]) => RaidSummaryType[])
    ) => void;
    setNoResults: (noResults: boolean) => void;
};

export function RaidSummaryContainer({
    filters,
    isLoading,
    data,
    dataLength,
    displayedData,
    noResults,
    setIsLoading,
    setData,
    setDataLength,
    setDisplayedData,
    setNoResults,
}: RaidSummaryContainerProps) {
    const [page, setPage] = useState(2);
    const observer = useRef<IntersectionObserver | null>(null);

    // Load more data after all data retrieved from the backend is shown
    const loadMoreData = useCallback(async () => {
        if (!noResults && !isLoading && dataLength == displayedData.length) {
            try {
                const queryString = filters ? `&${toQueryString(filters)}` : "";
                const result = await api.get(`/encounter/?page=${page}${queryString}`);

                const newData = result.data;

                // If no more data was sent
                if (newData.length == 0) {
                    setNoResults(true);
                    setIsLoading(false);
                    return;
                }

                // Update state with new data
                setDataLength((prevDataLength) => prevDataLength + newData.length);
                setData([...data, ...newData]);
                setPage(page + 1);
            } catch {
                setNoResults(true);
            }
        }

        // Update displayed data
        const nextBatch = data.slice(displayedData.length, displayedData.length + 5);
        setDisplayedData((prevDisplayedData) => [...prevDisplayedData, ...nextBatch]);

        setIsLoading(false);
    }, [
        filters,
        dataLength,
        isLoading,
        displayedData,
        page,
        data,
        noResults,
        setData,
        setDataLength,
        setDisplayedData,
        setNoResults,
        setIsLoading,
    ]);

    /* Intersection Observer */
    useEffect(() => {
        if (isLoading || noResults) return;

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
    }, [isLoading, noResults, setIsLoading, setNoResults, loadMoreData]);

    if (isLoading && data.length <= 0 && displayedData.length <= 0) return <Loading />;

    if (noResults && data.length <= 0 && displayedData.length <= 0)
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
                        avg_ilvl={entry.avg_ilvl}
                        highest_ilvl={entry.highest_ilvl}
                        death_count={entry.death_count}
                        player_data={entry.player_data}
                    />
                </li>
            ))}
            {isLoading && displayedData.length >= 0 && (
                <li>
                    <Loading />
                </li>
            )}
            {noResults && <li className="text-center">No more data to show.</li>}
            <div id="scrollTarget"></div>
        </>
    );
}
