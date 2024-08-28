import { RaidSummaryContainer } from "@components/Home/RaidSummary/RaidSummaryContainer";
import "@components/Home/Home.css";

export function Component() {
    return (
        <main>
            <div className="my-4 mx-4" id="RaidOverallContainer">
                <div className="m-1" id="FilterContainer">
                    Filters and stuff
                </div>
                <RaidSummaryContainer />
            </div>
        </main>
    );
}

Component.displayName = "HomePage";
