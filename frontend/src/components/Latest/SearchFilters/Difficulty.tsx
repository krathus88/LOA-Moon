import { FiltersType } from "@type/HomePageType";
import { DIFFICULTY_LEVELS } from "@utils/constants/encounters";
import Select, { StylesConfig } from "react-select";

type DifficultyProps = {
    filters: FiltersType;
    selectStyle: StylesConfig;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

export function Difficulty({ filters, selectStyle, setFilters }: DifficultyProps) {
    const handleDifficultyChange = (selectedOption: { value: string }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            difficulty: selectedOption?.value || "",
        }));
    };

    const difficultySelectValue =
        DIFFICULTY_LEVELS.find((option) => option.value === filters.difficulty) || null;

    return (
        <Select
            id="DifficultySelect"
            options={DIFFICULTY_LEVELS}
            onChange={(selectedOption) =>
                handleDifficultyChange(selectedOption as { value: string })
            }
            isClearable
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
