import { Loading } from "@components/Common/Loading";
import { PageHeader } from "@components/Common/PageHeader/PageHeader";
import { PartySummaryContainer } from "@components/Common/PartySummary/PartySummaryContainer";
import { SearchFiltersContainer } from "@components/Common/SearchFilters/SearchFiltersContainer";
import "@components/PartyRankings/PartyRankings.css";
import { api } from "@config/axios";
import { FiltersType, RaidSummaryType } from "@type/EncounterPreviewType";
import { ENCOUNTER_GROUPS } from "@utils/constants/encounters";
import { MAP_TO_IMAGE_PAGES } from "@utils/constants/general";
import { cleanFilters, toQueryString } from "@utils/functions";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const source = "p-party";
const defaultEncounter = ENCOUNTER_GROUPS[0].options[0].value;
const defaultDifficulty = "Normal";
const defaultOrderBy = "fast";

export function Component() {
    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState<RaidSummaryType[]>([]); // Fetched Data
    const [dataLength, setDataLength] = useState<number>(0); // Fetched Data Length (handles reloads)
    const [displayedData, setDisplayedData] = useState<RaidSummaryType[]>([]); // Displayed Data
    const [filters, setFilters] = useState<Partial<FiltersType>>({});
    const [isLoading, setIsLoading] = useState(true); // If data is loading, fetching or not
    const [noResults, setNoResults] = useState(false); // If no results found after fetch
    const [hasFailed, setHasFailed] = useState(false);

    // Refreshing Page or navigating to page
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            // Parse filters from query parameters
            const queryParams = new URLSearchParams(location.search);
            const cleanedFilters = cleanFilters({
                p_class_id: parseInt(queryParams.get("p_class_id") || "-1"),
                p_spec: queryParams.get("p_spec") || "",
                encounter: queryParams.get("encounter") || defaultEncounter,
                difficulty: queryParams.get("difficulty") || defaultDifficulty,
                date_from: queryParams.get("date_from") || "",
                date_until: queryParams.get("date_until") || "",
                order_by: queryParams.get("order_by") || defaultOrderBy,
            });
            setFilters(cleanedFilters);

            const queryString = toQueryString(cleanedFilters);

            try {
                const result = await api.get(
                    `/encounter/?${queryString}&source=${source}`
                );
                const fetchedData = result.data;

                setData(fetchedData);
                setDataLength(fetchedData.length);
                setDisplayedData(fetchedData.slice(0, 10));
                setNoResults(fetchedData.length === 0);
            } catch {
                setHasFailed(true);
            } finally {
                // Reset loading state once data is set
                setIsLoading(false);
            }
        };

        fetchData();
    }, [location.search]);

    // Handles Filter Submission
    const onFilterSubmit = useCallback(
        (filters: Partial<FiltersType>) => {
            setIsLoading(true);
            setHasFailed(false); // Reset error state back to none for new data fetch

            const cleanedFilters = cleanFilters(filters);
            const queryString = filters ? `?${toQueryString(cleanedFilters)}` : "";
            const queryParams = new URLSearchParams(location.search);
            const currentQueryString = `?${queryParams.toString()}`;

            // If new params, fetch new data
            if (queryString !== currentQueryString) {
                setFilters(cleanedFilters);
                setData([]);
                setDataLength(0);
                setDisplayedData([]);
                setNoResults(false);

                navigate(`/party-rankings${queryString}`);
            } else {
                setIsLoading(false);
            }
        },
        [navigate, location.search]
    );

    return (
        <main>
            <PageHeader title="Party Rankings" imgSrc={MAP_TO_IMAGE_PAGES["party"]} />
            <div className="my-3 mx-3 mx-md-4" id="RaidPartyContainer">
                <div>
                    <SearchFiltersContainer
                        source={source}
                        defaultEncounter={defaultEncounter}
                        defaultDifficulty={defaultDifficulty}
                        defaultOrderBy={defaultOrderBy}
                        isLoading={isLoading}
                        onSubmit={onFilterSubmit}
                    />
                </div>
                <div>
                    <ul id="PartySummaryContainer">
                        {isLoading && data.length <= 0 ? (
                            <Loading />
                        ) : (
                            <PartySummaryContainer
                                source={source}
                                filters={filters}
                                isLoading={isLoading}
                                hasFailed={hasFailed}
                                data={data}
                                dataLength={dataLength}
                                displayedData={displayedData}
                                noResults={noResults}
                                setIsLoading={setIsLoading}
                                setData={setData}
                                setDataLength={setDataLength}
                                setDisplayedData={setDisplayedData}
                                setNoResults={setNoResults}
                            />
                        )}
                    </ul>
                </div>
            </div>
        </main>
    );
}

Component.displayName = "PartyRankingsPage";
