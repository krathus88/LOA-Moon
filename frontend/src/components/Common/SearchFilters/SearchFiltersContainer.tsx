import { FiltersType } from "@type/HomePageType";
import { CLASS_ID_TO_CLASS_NAME, SUBCLASS_GROUPS } from "@utils/constants/classes";
import { useCallback, useEffect, useMemo, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
import { StylesConfig } from "react-select";
import { Class } from "./Class";
import { Date } from "./Date";
import { Difficulty } from "./Difficulty";
import { Encounter } from "./Encounter";
import { PlayerName } from "./PlayerName";
import "./SearchFilters.css";
import { Specialization } from "./Specialization";

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
    containerClassName: string;
    isLoading: boolean;
    onSubmit: (filters: Partial<FiltersType>) => void;
};

export function SearchFiltersContainer({
    containerClassName,
    isLoading,
    onSubmit,
}: SearchFiltersContainerProps) {
    const location = useLocation();

    const [formFilters, setFormFilters] = useState<FiltersType>({
        p_name: "",
        p_class_id: -1,
        p_spec: "",
        encounter: "",
        difficulty: "",
        date_from: "",
        date_until: "",
    });
    const [specializationGroups, setSpecializationGroups] = useState(SUBCLASS_GROUPS);

    // Parse query parameters from the URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const filters: FiltersType = {
            p_name: queryParams.get("p_name") || "",
            p_class_id: parseInt(queryParams.get("p_class_id") || "-1"),
            p_spec: queryParams.get("p_spec") || "",
            encounter: queryParams.get("encounter") || "",
            difficulty: queryParams.get("difficulty") || "",
            date_from: queryParams.get("date_from") || "",
            date_until: queryParams.get("date_until") || "",
        };

        // Update state with validated filters
        setFormFilters(filters);
    }, [location.search]);

    const memoizedSpecializationGroups = useMemo(() => {
        if (!formFilters.p_class_id) return SUBCLASS_GROUPS;

        const className = CLASS_ID_TO_CLASS_NAME.get(formFilters.p_class_id);

        if (className) {
            // Filter SUBCLASS_GROUPS based on the selected class name
            return SUBCLASS_GROUPS.filter((group) => group.label === className);
        }

        return SUBCLASS_GROUPS;
    }, [formFilters.p_class_id]);

    useEffect(() => {
        setSpecializationGroups(memoizedSpecializationGroups);
    }, [memoizedSpecializationGroups]);

    const handleFilterChange = (fieldName: string, newValue: string | number) => {
        setFormFilters((prevFilters) => ({
            ...prevFilters,
            [fieldName]: newValue,
        }));
    };

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            onSubmit(formFilters); // Notify parent to handle data fetching
        },
        [onSubmit, formFilters]
    );

    return (
        <form
            className={`form-label m-1 ${containerClassName}`}
            id="FilterContainer"
            onSubmit={handleSubmit}>
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
            <Accordion className="">
                <Accordion.Item eventKey="0">
                    <Accordion.Header></Accordion.Header>
                    <Accordion.Body>
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
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="button-container">
                <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={isLoading}>
                    Apply Filters
                </button>
            </div>
        </form>
    );
}
