import { FiltersType } from "@type/HomePageType";
import Select, { StylesConfig } from "react-select";

type SpecializationProps = {
    specializationGroups: {
        label: string;
        options: { value: string; label: string }[];
    }[];
    filters: FiltersType;
    selectStyle: StylesConfig;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

export function Specialization({
    specializationGroups,
    filters,
    selectStyle,
    setFilters,
}: SpecializationProps) {
    const handleSpecChange = (selectedOption: { value: string }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            p_spec: selectedOption?.value || "",
        }));
    };

    const specializationSelectValue = specializationGroups
        .flatMap((group) => group.options)
        .find((option) => option.value === filters.p_spec);

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
