import { RaidSummary } from "./RaidSummary";
import "./RaidSummary.css";

export function RaidSummaryContainer() {
    return (
        <div className="container my-4" id="RaidSummaryContainer">
            <RaidSummary />
            <RaidSummary />
            <RaidSummary />
            <RaidSummary />
            <RaidSummary />
        </div>
    );
}
