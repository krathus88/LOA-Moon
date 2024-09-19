import { DoubleArrowDown } from "@icons/DoubleArrowDown";
import { FiltersType } from "@type/HomePageType";
import Accordion from "react-bootstrap/Accordion";
import { StylesConfig } from "react-select";
import { Date } from "./Date";
import { Difficulty } from "./Difficulty";
import { Encounter } from "./Encounter";
import { ExpandToggle } from "./ExpandToggle";
import { OrderBy } from "./OrderBy";

type PartyFiltersContainerProps = {
    formFilters: FiltersType;
    SelectStyle: StylesConfig;
    handleFilterChange: (fieldName: string, newValue: string | number) => void;
};

export function PartyFiltersContainer({
    formFilters,
    SelectStyle,
    handleFilterChange,
}: PartyFiltersContainerProps) {
    return (
        <div id="PartyFilters">
            <div id="FilterEncounters">
                <Encounter
                    selectStyle={SelectStyle}
                    value={formFilters.encounter}
                    onChange={handleFilterChange}
                />
                <Difficulty
                    selectStyle={SelectStyle}
                    value={formFilters.difficulty}
                    onChange={handleFilterChange}
                />
            </div>
            <div id="FilterDates">
                <Date
                    label="From"
                    type="date_from"
                    value={formFilters.date_from}
                    onChange={handleFilterChange}
                />
                <Date
                    label="To"
                    type="date_until"
                    value={formFilters.date_until}
                    onChange={handleFilterChange}
                />
            </div>
            <div id="ToggleAdvancedFilters">
                <Accordion alwaysOpen>
                    <ExpandToggle eventKey="0">
                        Advanced Filters <DoubleArrowDown />
                    </ExpandToggle>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            <div id="FilterOrderBy">
                                <OrderBy
                                    value={formFilters.order_by}
                                    onChange={handleFilterChange}
                                    option1_value="fast"
                                    option2_value="slow"
                                    option1_text="Fastest"
                                    option2_text="Slowest"
                                />
                            </div>
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        </div>
    );
}
