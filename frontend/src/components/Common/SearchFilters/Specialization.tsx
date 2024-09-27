import { ClassOptionsType } from "@type/GeneralType";
import { useCallback, useMemo } from "react";
import Select, { GroupBase, StylesConfig } from "react-select";

type SpecializationProps = {
    specializationGroups: {
        label: string;
        options: { value: string; label: string }[];
    }[];
    selectStyle: StylesConfig<ClassOptionsType, boolean, GroupBase<ClassOptionsType>>;
    value: string | null;
    onChange: (fieldName: string, newValue: string) => void;
};

export function Specialization({
    specializationGroups,
    selectStyle,
    value,
    onChange,
}: SpecializationProps) {
    const handleSpecChange = useCallback(
        (selectedOption: { value: string } | null) => {
            onChange("p_spec", selectedOption ? selectedOption.value : "");
        },
        [onChange]
    );

    const specializationSelectValue = useMemo(() => {
        return (
            specializationGroups
                .flatMap((group) => group.options)
                .find((option) => option.value === value) || null
        );
    }, [specializationGroups, value]);

    return (
        <Select
            id="SpecSelect"
            options={specializationGroups}
            onChange={(selectedOption) =>
                handleSpecChange(selectedOption as { value: string })
            }
            isClearable
            value={specializationSelectValue || null}
            placeholder="Specialization"
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
