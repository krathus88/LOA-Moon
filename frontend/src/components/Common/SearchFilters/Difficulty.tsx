import { ClassOptionsType, SourceType } from "@type/GeneralType";
import { DIFFICULTY_LEVELS } from "@utils/constants/encounters";
import { useCallback, useMemo } from "react";
import Select, { GroupBase, StylesConfig } from "react-select";

type DifficultyProps = {
    source: SourceType;
    selectStyle: StylesConfig<ClassOptionsType, boolean, GroupBase<ClassOptionsType>>;
    value: string | null;
    onChange: (fieldName: string, newValue: string) => void;
};

export function Difficulty({ source, selectStyle, value, onChange }: DifficultyProps) {
    const handleDifficultyChange = useCallback(
        (selectedOption: { value: string } | null) => {
            onChange("difficulty", selectedOption ? selectedOption.value : "");
        },
        [onChange]
    );

    const difficultySelectValue = useMemo(() => {
        return DIFFICULTY_LEVELS.find((option) => option.value === value) || null;
    }, [value]);

    return (
        <Select
            id="DifficultySelect"
            options={DIFFICULTY_LEVELS}
            onChange={(selectedOption) =>
                handleDifficultyChange(selectedOption as { value: string })
            }
            isClearable={source !== "p-party" && source !== "p-class"}
            value={difficultySelectValue}
            placeholder="Difficulty"
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
