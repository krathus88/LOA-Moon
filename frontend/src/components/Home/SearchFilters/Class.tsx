import { FiltersType } from "@type/HomePageType";
import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { CLASS_GROUPS } from "@utils/constants/classes";
import Select, { StylesConfig } from "react-select";

type ClassProps = {
    filters: FiltersType;
    selectStyle: StylesConfig;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

export function Class({ filters, selectStyle, setFilters }: ClassProps) {
    const handleClassChange = (selectedOption: { value: number }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            p_class_id: selectedOption?.value || -1,
            p_spec: "",
        }));
    };

    // Map class options with images
    const classOptions = CLASS_GROUPS.map((group) => ({
        ...group,
        options: group.options.map((option) => ({
            ...option,
            label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={MAP_TO_IMAGE_CLASSES[option.value]} // Class Id
                        alt={`${option.label} icon`} // Class Name
                        style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "8px",
                        }}
                    />
                    {option.label}
                </div>
            ),
        })),
    }));

    // Find the currently selected value
    const classSelectValue = CLASS_GROUPS.flatMap((group) => group.options).find(
        (option) => option.value === filters.p_class_id
    );

    return (
        <Select
            id="ClassSelect"
            options={classOptions}
            onChange={(selectedOption) =>
                handleClassChange(selectedOption as { value: number })
            }
            isClearable
            value={classSelectValue}
            placeholder="Class"
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
