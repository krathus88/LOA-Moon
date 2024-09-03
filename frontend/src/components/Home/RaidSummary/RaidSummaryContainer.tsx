import { Loading } from "@components/Common/Loading";
import { FiltersType, RaidSummaryType } from "@type/HomePageType";
import { useEffect, useRef, useState } from "react";
import { RaidSummary } from "./RaidSummary";
import "./RaidSummary.css";
import { toQueryString } from "@utils/functions";
import { api } from "@config/axios";
import { useCallback } from "react";

type RaidSummaryContainerProps = {
    filters: FiltersType;
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
    const [page, setPage] = useState(1);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchDataFromAPI = useCallback(
        async (page: number = 1): Promise<RaidSummaryType[]> => {
            try {
                const queryString = filters ? `&${toQueryString(filters)}` : "";

                const result = await api.get(`/encounter/?page=${page}${queryString}`);
                return result.data;
            } catch {
                return [];
            }
        },
        [filters]
    );

    const loadMoreData = useCallback(async () => {
        if (!noResults && !isLoading && dataLength == displayedData.length) {
            const result = await fetchDataFromAPI(page);

            if (result.length == 0) {
                setNoResults(true);
                setIsLoading(false);

                return;
            }
            setDataLength((prevDataLength) => prevDataLength + result.length);
            setData([...data, ...result]);
            setPage(page + 1);
        }

        const nextBatch = data.slice(displayedData.length, displayedData.length + 5);
        setDisplayedData((prevDisplayedData) => [...prevDisplayedData, ...nextBatch]);

        setIsLoading(false);
    }, [
        dataLength,
        isLoading,
        displayedData,
        page,
        data,
        noResults,
        fetchDataFromAPI,
        setData,
        setDataLength,
        setDisplayedData,
        setNoResults,
        setIsLoading,
    ]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setIsLoading(true);

            const result = await fetchDataFromAPI();

            if (result.length <= 0) {
                setNoResults(true);
                setIsLoading(false);
                return;
            }

            setData(result);
            setDisplayedData(result.slice(0, 10));
            setIsLoading(false);
            setDataLength(result.length);
            setPage(2);
        };

        fetchDataAsync();
    }, [
        fetchDataFromAPI,
        setData,
        setDataLength,
        setDisplayedData,
        setIsLoading,
        setNoResults,
    ]);

    /* Intersection Observer */
    useEffect(() => {
        if (isLoading || noResults) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
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
    }, [isLoading, noResults, setNoResults, loadMoreData]);

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
                        max_boss_hp_bars={entry.max_boss_hp_bars}
                        avg_ilvl={entry.avg_ilvl}
                        highest_ilvl={entry.highest_ilvl}
                        death_count={entry.death_count}
                        player_data={entry.player_data}
                    />
                </li>
            ))}
            {isLoading && data.length >= 0 && displayedData.length >= 0 && (
                <li>
                    <Loading />
                </li>
            )}
            {noResults && <li className="text-center">No more data to show.</li>}
            <div id="scrollTarget"></div>
        </>
    );
}
