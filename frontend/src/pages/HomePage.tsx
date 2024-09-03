import "@components/Home/Home.css";
import { RaidSummaryContainer } from "@components/Home/RaidSummary/RaidSummaryContainer";
import { SearchFiltersContainer } from "@components/Home/SearchFilters/SearchFiltersContainer";
import { useState } from "react";
import { FiltersType } from "@type/HomePageType";
import { RaidSummaryType } from "@type/HomePageType";

export function Component() {
    const [data, setData] = useState<RaidSummaryType[]>([]); // Fetched Data
    const [dataLength, setDataLength] = useState<number>(0); // Fetched Data Length (handles reloads)
    const [displayedData, setDisplayedData] = useState<RaidSummaryType[]>([]); // Displayed Data
    const [filters, setFilters] = useState<FiltersType>({}); // Filters
    const [isLoading, setIsLoading] = useState(true); // If data is loading, fetching or not
    const [noResults, setNoResults] = useState(false); // If no results found after fetch

    const handleFilterChange = (newFilters: FiltersType) => {
        setFilters(newFilters);
    };

    return (
        <main>
            <div className="my-4 mx-3 mx-md-4 gap-4" id="RaidOverallContainer">
                <SearchFiltersContainer
                    isLoading={isLoading}
                    onFilterChange={handleFilterChange}
                    setIsLoading={setIsLoading}
                    setData={setData}
                    setDataLength={setDataLength}
                    setDisplayedData={setDisplayedData}
                    setNoResults={setNoResults}
                />
                <ul className="col" id="RaidSummaryContainer">
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

Component.displayName = "HomePage";
