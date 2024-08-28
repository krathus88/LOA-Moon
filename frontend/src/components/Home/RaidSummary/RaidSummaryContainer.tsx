import { RaidSummary } from "./RaidSummary";
import "./RaidSummary.css";

export function RaidSummaryContainer() {
    return (
        <div className="col" id="RaidSummaryContainer">
            <RaidSummary />
            <RaidSummary />
            <RaidSummary />
            <RaidSummary />
            <RaidSummary />
        </div>
    );
}
