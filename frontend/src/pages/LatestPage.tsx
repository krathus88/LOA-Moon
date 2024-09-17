import { Loading } from "@components/Common/Loading";
import { SearchFiltersContainer } from "@components/Common/SearchFilters/SearchFiltersContainer";
import "@components/Latest/Latest.css";
import { RaidSummaryContainer } from "@components/Latest/RaidSummary/RaidSummaryContainer";
import { api } from "@config/axios";
import { FiltersType, RaidSummaryType } from "@type/HomePageType";
import { cleanFilters, toQueryString } from "@utils/functions";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const queryString = url.searchParams.toString();

    try {
        const result = await api.get(`/encounter/?${queryString}`);
        return result.data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
}

export function Component() {
    const navigate = useNavigate();
    const location = useLocation();

    const dataFromLoader = useLoaderData() as RaidSummaryType[]; // Retrieve data from loader
    const [data, setData] = useState<RaidSummaryType[]>([]); // Fetched Data
    const [dataLength, setDataLength] = useState<number>(0); // Fetched Data Length (handles reloads)
    const [displayedData, setDisplayedData] = useState<RaidSummaryType[]>([]); // Displayed Data
    const [filters, setFilters] = useState<Partial<FiltersType>>({});
    const [isLoading, setIsLoading] = useState(true); // If data is loading, fetching or not
    const [noResults, setNoResults] = useState(dataFromLoader.length === 0); // If no results found after fetch

    // Handles Filter Submission
    const onFilterSubmit = useCallback(
        (filters: Partial<FiltersType>) => {
            setIsLoading(true);
            setData([]);
            setDataLength(0);
            setDisplayedData([]);
            setNoResults(false);

            const cleanedFilters = cleanFilters(filters);
            setFilters(cleanedFilters);

            const queryString = filters ? `?${toQueryString(cleanedFilters)}` : "";

            navigate(`/latest${queryString}`);
        },
        [navigate]
    );

    // Refreshing Page or navigating to page
    // OR When refreshing page
    useEffect(() => {
        setIsLoading(true);

        // Parse filters from query parameters
        const queryParams = new URLSearchParams(location.search);
        const cleanedFilters = cleanFilters({
            p_name: queryParams.get("p_name") || "",
            p_class_id: parseInt(queryParams.get("p_class_id") || "-1"),
            p_spec: queryParams.get("p_spec") || "",
            encounter: queryParams.get("encounter") || "",
            difficulty: queryParams.get("difficulty") || "",
            date_from: queryParams.get("date_from") || "",
            date_until: queryParams.get("date_until") || "",
        });
        setFilters(cleanedFilters);

        setData(dataFromLoader);
        setDataLength(dataFromLoader.length);
        setDisplayedData(dataFromLoader.slice(0, 10));
        setNoResults(dataFromLoader.length === 0);

        // Reset loading state once data is set
        setIsLoading(false);
    }, [location.search, dataFromLoader]);

    return (
        <main>
            <div className="my-4 mx-3 mx-md-4" id="RaidOverallContainer">
                <SearchFiltersContainer
                    containerClassName="p-latest"
                    isLoading={isLoading}
                    onSubmit={onFilterSubmit}
                />
                <ul id="RaidSummaryContainer">
                    {isLoading && data.length <= 0 ? (
                        <Loading />
                    ) : (
                        <RaidSummaryContainer
                            filters={filters}
                            isLoading={isLoading}
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
        </main>
    );
}

Component.displayName = "LatestPage";

Component.loader = loader;
