import { RaidSummary } from "./RaidSummary";
import "./RaidSummary.css";

export function RaidSummaryContainer() {
    return (
        <ul className="col" id="RaidSummaryContainer">
            <li>
                <RaidSummary encounter_id={5} />
            </li>
            <li>
                <RaidSummary encounter_id={4} />
            </li>
            <li>
                <RaidSummary encounter_id={3} />
            </li>
            <li>
                <RaidSummary encounter_id={2} />
            </li>
            <li>
                <RaidSummary encounter_id={1} />
            </li>
        </ul>
    );
}
