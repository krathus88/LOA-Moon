import "@components/Home/Home.css";
import { RaidSummaryContainer } from "@components/Home/RaidSummary/RaidSummaryContainer";

export function Component() {
    return (
        <main>
            <div className="my-4 mx-3 mx-md-4" id="RaidOverallContainer">
                <div className="m-1" id="FilterContainer">
                    Filters and stuff
                </div>
                <RaidSummaryContainer />
            </div>
        </main>
    );
}

Component.displayName = "HomePage";
