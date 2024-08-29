import { RaidSummary } from "./RaidSummary";
import "./RaidSummary.css";

export function RaidSummaryContainer() {
    return (
        <ul className="col" id="RaidSummaryContainer">
            <li>
                <RaidSummary />
            </li>

            <li>
                <RaidSummary />
            </li>
            <li>
                <RaidSummary />
            </li>
            <li>
                <RaidSummary />
            </li>
            <li>
                <RaidSummary />
            </li>
        </ul>
    );
}
