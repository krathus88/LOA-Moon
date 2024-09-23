import { SourceType } from "@type/GeneralType";
import { ENCOUNTER_GROUPS } from "@utils/constants/encounters";
import { useCallback, useMemo } from "react";
import Select, { StylesConfig } from "react-select";

type EncounterProps = {
    source: SourceType;
    selectStyle: StylesConfig;
    value: string | null;
    onChange: (fieldName: string, newValue: string) => void;
};

export function Encounter({ source, selectStyle, value, onChange }: EncounterProps) {
    const handleEncounterChange = useCallback(
        (selectedOption: { value: string } | null) => {
            onChange("encounter", selectedOption ? selectedOption.value : "");
        },
        [onChange]
    );

    const encounterSelectValue = useMemo(() => {
        return (
            ENCOUNTER_GROUPS.flatMap((group) => group.options).find(
                (option) => option.value === value
            ) || null
        );
    }, [value]);

    return (
        <Select
            id="EncounterSelect"
            options={ENCOUNTER_GROUPS}
            onChange={(selectedOption) =>
                handleEncounterChange(selectedOption as { value: string })
            }
            isClearable={source !== "p-party" && source !== "p-class"}
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
