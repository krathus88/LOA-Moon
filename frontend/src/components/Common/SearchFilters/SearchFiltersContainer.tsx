import { Button } from "@mui/material";
import { FiltersType } from "@type/EncounterPreviewType";
import { SourceType } from "@type/GeneralType";
import { CLASS_ID_TO_CLASS_NAME, SUBCLASS_GROUPS } from "@utils/constants/classes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { StylesConfig } from "react-select";
import { ClassFiltersContainer } from "./ClassFiltersContainer";
import { LatestFiltersContainer } from "./LatestFiltersContainer";
import { PartyFiltersContainer } from "./PartyFiltersContainer";
import "./SearchFilters.css";

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
    source: SourceType;
    defaultEncounter: string;
    defaultDifficulty: string;
    defaultOrderBy: string;
    isLoading: boolean;
    onSubmit: (filters: Partial<FiltersType>) => void;
};

export function SearchFiltersContainer({
    source,
    defaultEncounter,
    defaultDifficulty,
    defaultOrderBy,
    isLoading,
    onSubmit,
}: SearchFiltersContainerProps) {
    const location = useLocation();

    const [formFilters, setFormFilters] = useState<FiltersType>({
        p_name: "",
        p_class_id: -1,
        p_spec: "",
        encounter: defaultEncounter,
        difficulty: defaultDifficulty,
        date_from: "",
        date_until: "",
        order_by: defaultOrderBy,
    });
    const [specializationGroups, setSpecializationGroups] = useState(SUBCLASS_GROUPS);

    // Refreshing Page or navigating to page
    useEffect(() => {
        // Parse query parameters from the URL
        const queryParams = new URLSearchParams(location.search);

        const filters: FiltersType = {
            p_name: queryParams.get("p_name") || "",
            p_class_id: parseInt(queryParams.get("p_class_id") || "-1"),
            p_spec: queryParams.get("p_spec") || "",
            encounter: queryParams.get("encounter") || defaultEncounter,
            difficulty: queryParams.get("difficulty") || defaultDifficulty,
            date_from: queryParams.get("date_from") || "",
            date_until: queryParams.get("date_until") || "",
            order_by: queryParams.get("order_by") || defaultOrderBy,
        };

        // Update state with validated filters
        setFormFilters(filters);
    }, [location.search, defaultOrderBy, defaultEncounter, defaultDifficulty]);

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
            className={`form-label m-1 ${source}`}
            id="FilterContainer"
            onSubmit={handleSubmit}>
            {source === "p-latest" && (
                <LatestFiltersContainer
                    source={source}
                    formFilters={formFilters}
                    SelectStyle={SelectStyle}
                    specializationGroups={specializationGroups}
                    handleFilterChange={handleFilterChange}
                />
            )}
            {source === "p-class" && (
                <ClassFiltersContainer
                    source={source}
                    formFilters={formFilters}
                    SelectStyle={SelectStyle}
                    specializationGroups={specializationGroups}
                    handleFilterChange={handleFilterChange}
                />
            )}
            {source === "p-party" && (
                <PartyFiltersContainer
                    source={source}
                    formFilters={formFilters}
                    SelectStyle={SelectStyle}
                    handleFilterChange={handleFilterChange}
                />
            )}
            <div className="apply-filters-container mt-2">
                <Button variant="contained" type="submit" disabled={isLoading}>
                    Apply Filters
                </Button>
            </div>
        </form>
    );
}
