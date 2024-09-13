import { FiltersType } from "@type/HomePageType";
import { ENCOUNTER_GROUPS } from "@utils/constants/encounters";
import Select, { StylesConfig } from "react-select";

type EncounterProps = {
    filters: FiltersType;
    selectStyle: StylesConfig;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

export function Encounter({ filters, selectStyle, setFilters }: EncounterProps) {
    const handleEncounterChange = (selectedOption: { value: string }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            encounter: selectedOption?.value || "",
        }));
    };

    const encounterSelectValue = ENCOUNTER_GROUPS.flatMap(
        (group) => group.options
    ).find((option) => option.value === filters.encounter);

    return (
        <Select
            id="EncounterSelect"
            options={ENCOUNTER_GROUPS}
            onChange={(selectedOption) =>
                handleEncounterChange(selectedOption as { value: string })
            }
            isClearable
            value={encounterSelectValue}
            placeholder="Encounter"
            styles={selectStyle}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: "#495057", // Dropdown Hover color
                    primary: "#343a40", // Dropdown Selected color
                },
            })}
        />
    );
}
