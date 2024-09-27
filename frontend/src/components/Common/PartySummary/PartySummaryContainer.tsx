import { Loading } from "@components/Common/Loading";
import { api } from "@config/axios";
import { FiltersType, RaidSummaryType } from "@type/EncounterPreviewType";
import { SourceType } from "@type/GeneralType";
import { toQueryString } from "@utils/functions";
import { useCallback, useEffect, useRef, useState } from "react";
import { PartySummary } from "./PartySummary";
import "./PartySummary.css";

type PartySummaryContainerProps = {
    source: SourceType;
    filters: Partial<FiltersType>;
    isLoading: boolean;
    hasFailed: boolean;
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

export function PartySummaryContainer({
    source,
    filters,
    isLoading,
    hasFailed,
    data,
    dataLength,
    displayedData,
    noResults,
    setIsLoading,
    setData,
    setDataLength,
    setDisplayedData,
    setNoResults,
}: PartySummaryContainerProps) {
    const [page, setPage] = useState(2);
    const observer = useRef<IntersectionObserver | null>(null);

    // Load more data after all data retrieved from the backend is shown
    const loadMoreData = useCallback(async () => {
        if (!noResults && !isLoading && dataLength == displayedData.length) {
            try {
                const queryString = filters ? `&${toQueryString(filters)}` : "";
                const result = await api.get(
                    `/encounter/?page=${page}${queryString}&source=${source}`
                );

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
        source,
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
        if (isLoading || noResults || hasFailed) return;

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
    }, [isLoading, hasFailed, noResults, setIsLoading, setNoResults, loadMoreData]);

    if (isLoading && data.length <= 0 && displayedData.length <= 0 && !hasFailed)
        return <Loading />;

    if (noResults && data.length <= 0 && displayedData.length <= 0 && !hasFailed)
        return <li className="text-center">No data to show.</li>;

    return (
        <>
            {displayedData.map((entry, index) => {
                const liKey = `g${index + 1}_${entry.encounter_id}`;
                return (
                    <li key={liKey}>
                        <PartySummary
                            liKey={liKey}
                            encounter_id={entry.encounter_id}
                            region={entry.region}
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
                );
            })}
            {isLoading && displayedData.length >= 0 && !hasFailed && (
                <li>
                    <Loading />
                </li>
            )}
            {hasFailed ? (
                <li className="text-center">
                    Oops! An error occurred while fetching data.
                </li>
            ) : (
                noResults && <li className="text-center">No more data to show.</li>
            )}
            <div id="scrollTarget"></div>
        </>
    );
}
