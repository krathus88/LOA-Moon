import { DoubleArrowDown } from "@icons/DoubleArrowDown";
import { FiltersType } from "@type/HomePageType";
import Accordion from "react-bootstrap/Accordion";
import { StylesConfig } from "react-select";
import { Date } from "./Date";
import { Difficulty } from "./Difficulty";
import { Encounter } from "./Encounter";
import { ExpandToggle } from "./ExpandToggle";
import { OrderBy } from "./OrderBy";
import { PlayerName } from "./PlayerName";
import { Class } from "./Class";
import { Specialization } from "./Specialization";

type SpecializationGroupsType = {
    label: string;
    options: {
        value: string;
        label: string;
    }[];
};

type ClassFiltersContainerProps = {
    formFilters: FiltersType;
    SelectStyle: StylesConfig;
    specializationGroups: SpecializationGroupsType[];
    handleFilterChange: (fieldName: string, newValue: string | number) => void;
};

export function ClassFiltersContainer({
    formFilters,
    SelectStyle,
    specializationGroups,
    handleFilterChange,
}: ClassFiltersContainerProps) {
    return (
        <div id="ClassFilters">
            <div id="FilterPlayers">
                <PlayerName value={formFilters.p_name} onChange={handleFilterChange} />
                <Class
                    selectStyle={SelectStyle}
                    value={formFilters.p_class_id}
                    onChange={handleFilterChange}
                />
                <Specialization
                    specializationGroups={specializationGroups}
                    selectStyle={SelectStyle}
                    value={formFilters.p_spec}
                    onChange={handleFilterChange}
                />
            </div>
            <div id="ExtraFilters">
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
                                        option1_value="high"
                                        option2_value="low"
                                        option1_text="Highest"
                                        option2_text="Lowest"
                                    />
                                </div>
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
