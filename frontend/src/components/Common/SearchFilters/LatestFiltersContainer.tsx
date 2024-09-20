import { DoubleArrowDown } from "@icons/DoubleArrowDown";
import { FiltersSourceType, FiltersType } from "@type/HomePageType";
import Accordion from "react-bootstrap/Accordion";
import { StylesConfig } from "react-select";
import { Class } from "./Class";
import { Date } from "./Date";
import { Difficulty } from "./Difficulty";
import { Encounter } from "./Encounter";
import { ExpandToggle } from "./ExpandToggle";
import { PlayerName } from "./PlayerName";
import { Specialization } from "./Specialization";

type SpecializationGroupsType = {
    label: string;
    options: {
        value: string;
        label: string;
    }[];
};

type LatestFiltersContainerProps = {
    source: FiltersSourceType;
    formFilters: FiltersType;
    SelectStyle: StylesConfig;
    specializationGroups: SpecializationGroupsType[];
    handleFilterChange: (fieldName: string, newValue: string | number) => void;
};

export function LatestFiltersContainer({
    source,
    formFilters,
    SelectStyle,
    specializationGroups,
    handleFilterChange,
}: LatestFiltersContainerProps) {
    return (
        <div id="LatestFilters">
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
            <Accordion alwaysOpen>
                <ExpandToggle eventKey="0">
                    Extra Filters <DoubleArrowDown />
                </ExpandToggle>
                <Accordion.Collapse eventKey="0">
                    <div>
                        <div id="FilterEncounters">
                            <Encounter
                                source={source}
                                selectStyle={SelectStyle}
                                value={formFilters.encounter}
                                onChange={handleFilterChange}
                            />
                            <Difficulty
                                source={source}
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
                            <ExpandToggle eventKey="1">
                                Advanced Filters <DoubleArrowDown />
                            </ExpandToggle>
                            <Accordion.Collapse eventKey="1">
                                <div>Hello</div>
                            </Accordion.Collapse>
                        </div>
                    </div>
                </Accordion.Collapse>
            </Accordion>
        </div>
    );
}
