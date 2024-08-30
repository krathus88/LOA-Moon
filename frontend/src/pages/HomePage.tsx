import "@components/Home/Home.css";
import { RaidSummaryContainer } from "@components/Home/RaidSummary/RaidSummaryContainer";
import { SearchFiltersContainer } from "@components/Home/SearchFilters/SearchFiltersContainer";

export function Component() {
    return (
        <main>
            <div className="my-4 mx-3 mx-md-4" id="RaidOverallContainer">
                <SearchFiltersContainer />
                <RaidSummaryContainer />
            </div>
        </main>
    );
}

Component.displayName = "HomePage";
