import { api } from "@config/axios";
import { FiltersType, RaidSummaryType } from "@type/HomePageType";
import { CLASS_ID_TO_CLASS_NAME, SUBCLASS_GROUPS } from "@utils/constants/classes";
import { toQueryString } from "@utils/functions";
import { useEffect, useState } from "react";
import { StylesConfig } from "react-select";
import { Class } from "./Class";
import { Date } from "./Date";
import { Difficulty } from "./Difficulty";
import { Encounter } from "./Encounter";
import { PlayerName } from "./PlayerName";
import "./SearchFilters.css";
import { Specialization } from "./Specialization";
import Accordion from "react-bootstrap/Accordion";

const SelectStyle: StylesConfig = {
    control: (base, state) => ({
        ...base,
        color: "var(--bs-body-color)",
        fontWeight: "400",
        backgroundColor: "var(--bs-body-bg)",
        transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;",
        height: "calc(3.5rem + 2px)",
        borderColor: state.isFocused
            ? "rgba(255, 255, 255, 0.5)"
            : "var(--bs-border-color)",
        boxShadow: state.isFocused
            ? "0 0 0 0.2rem rgba(255, 255, 255, 0.1)"
            : base.boxShadow,
    }),
    /* X */
    clearIndicator: (base) => ({
        ...base,
        "&:hover": {
            color: "white",
        },
    }),
    /* Drodpown Menu */
    container: (base) => ({
        ...base,
        fontWeight: "400",
    }),
    dropdownIndicator: (base) => ({
        ...base,
        "&:hover": {
            color: "white",
        },
    }),
    /* Written Input Value */
    input: (base) => ({
        ...base,
        color: "var(--bs-body-color)",
    }),
    /* Shown Selected Value */
    singleValue: (base) => ({
        ...base,
        color: "var(--bs-body-color)",
    }),
    /* Placeholder Value */
    placeholder: (base) => ({
        ...base,
        color: "#adb5bd",
    }),
    menu: (base) => ({
        ...base,
        zIndex: "3",
        backgroundColor: "var(--bs-body-bg)",
        transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
        border: "1px solid var(--bs-border-color)",
    }),
};

type SearchFiltersContainerProps = {
    isLoading: boolean;
    onFilterChange: (filters: FiltersType) => void;
    setIsLoading: (loading: boolean) => void;
    setData: (data: RaidSummaryType[]) => void;
    setDataLength: (dataLength: number) => void;
    setDisplayedData: (displayedData: RaidSummaryType[]) => void;
    setNoResults: (noResults: boolean) => void;
};

export function SearchFiltersContainer({
    isLoading,
    onFilterChange,
    setIsLoading,
    setData,
    setDataLength,
    setDisplayedData,
    setNoResults,
}: SearchFiltersContainerProps) {
    const [filters, setFilters] = useState<FiltersType>({
        p_name: "",
        p_class_id: -1,
        p_spec: "",
        encounter: "",
        difficulty: "",
        date_from: "",
        date_until: "",
    });

    const [specializationGroups, setSpecializationGroups] = useState(SUBCLASS_GROUPS);

    useEffect(() => {
        const className = CLASS_ID_TO_CLASS_NAME.get(filters.p_class_id);

        if (className) {
            // Filter SUBCLASS_GROUPS based on the selected class name
            const filteredGroups = SUBCLASS_GROUPS.filter(
                (group) => group.label === className
            );
            setSpecializationGroups(filteredGroups);
        } else {
            // Show all specializations if no class is selected
            setSpecializationGroups(SUBCLASS_GROUPS);
        }
    }, [filters.p_class_id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData([]);
        setIsLoading(true);
        setDisplayedData([]);
        setNoResults(false);

        try {
            const queryString = filters ? `&${toQueryString(filters)}` : "";

            const result = await api.get(`/encounter/?${queryString}`);

            if (result.data.length <= 0) {
                setNoResults(true);
            }
            setDataLength(result.data.length);
            setData(result.data);

            if (onFilterChange) {
                onFilterChange(filters);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="form-label m-1 " id="FilterContainer" onSubmit={handleSubmit}>
            <div id="FilterPlayers">
                <PlayerName filters={filters} setFilters={setFilters} />
                <Class
                    filters={filters}
                    selectStyle={SelectStyle}
                    setFilters={setFilters}
                />
                <Specialization
                    specializationGroups={specializationGroups}
                    filters={filters}
                    selectStyle={SelectStyle}
                    setFilters={setFilters}
                />
            </div>
            <Accordion className="">
                <Accordion.Item eventKey="0">
                    <Accordion.Header></Accordion.Header>
                    <Accordion.Body>
                        <div id="FilterEncounters">
                            <Encounter
                                filters={filters}
                                selectStyle={SelectStyle}
                                setFilters={setFilters}
                            />
                            <Difficulty
                                filters={filters}
                                selectStyle={SelectStyle}
                                setFilters={setFilters}
                            />
                        </div>

                        <div id="FilterDates">
                            <Date
                                label="From"
                                type="date_from"
                                filters={filters}
                                setFilters={setFilters}
                            />
                            <Date
                                label="To"
                                type="date_until"
                                filters={filters}
                                setFilters={setFilters}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <button type="submit" className="btn btn-secondary" disabled={isLoading}>
                Apply Filters
            </button>
        </form>
    );
}
