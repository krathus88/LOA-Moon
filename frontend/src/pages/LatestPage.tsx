import "@components/Latest/Latest.css";
import { RaidSummaryContainer } from "@components/Latest/RaidSummary/RaidSummaryContainer";
import { SearchFiltersContainer } from "@components/Latest/SearchFilters/SearchFiltersContainer";
import { useState } from "react";
import { FiltersType } from "@type/HomePageType";
import { RaidSummaryType } from "@type/HomePageType";

export function Component() {
    const [data, setData] = useState<RaidSummaryType[]>([]); // Fetched Data
    const [dataLength, setDataLength] = useState<number>(0); // Fetched Data Length (handles reloads)
    const [displayedData, setDisplayedData] = useState<RaidSummaryType[]>([]); // Displayed Data
    const [filters, setFilters] = useState<FiltersType>({
        p_name: "",
        p_class_id: -1,
        p_spec: "",
        encounter: "",
        difficulty: "",
        date_from: "",
        date_until: "",
    }); // Filters
    const [isLoading, setIsLoading] = useState(true); // If data is loading, fetching or not
    const [noResults, setNoResults] = useState(false); // If no results found after fetch

    const handleFilterChange = (newFilters: FiltersType) => {
        setFilters(newFilters);
    };

    return (
        <main>
            <div className="my-4 mx-3 mx-md-4" id="RaidOverallContainer">
                <SearchFiltersContainer
                    isLoading={isLoading}
                    onFilterChange={handleFilterChange}
                    setIsLoading={setIsLoading}
                    setData={setData}
                    setDataLength={setDataLength}
                    setDisplayedData={setDisplayedData}
                    setNoResults={setNoResults}
                />
                <ul id="RaidSummaryContainer">
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
                </ul>
            </div>
        </main>
    );
}

Component.displayName = "LatestPage";
