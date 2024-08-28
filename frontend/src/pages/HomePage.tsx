import { RaidSummaryContainer } from "@components/Home/RaidSummary/RaidSummaryContainer";
import "@components/Home/Home.css";

export function Component() {
    return (
        <main className="mx-auto">
            <RaidSummaryContainer />
        </main>
    );
}

Component.displayName = "HomePage";
