import { FiltersType } from "@type/HomePageType";
import Select, { StylesConfig } from "react-select";
import { CLASS_NAME_TO_CLASS_ID } from "@utils/constants";

type ClassProps = {
    filters: FiltersType;
    selectStyle: StylesConfig;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

export function Class({ filters, selectStyle, setFilters }: ClassProps) {
    const handleClassChange = (selectedOption: { value: string }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            p_class: selectedOption?.value || "",
            p_spec: "",
        }));
    };

    const classOptions = [...CLASS_NAME_TO_CLASS_ID.entries()].map(
        ([className, classId]) => ({
            value: className,
            label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={`${import.meta.env.BASE_URL}classes/${classId}.png`}
                        alt={`${className} icon`}
                        style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "8px",
                        }}
                    />
                    {className}
                </div>
            ),
        })
    );

    const classSelectValue = classOptions.find(
        (option) => option.value === filters.p_class
    );

    return (
        <Select
            id="ClassSelect"
            options={classOptions}
            onChange={(selectedOption) =>
                handleClassChange(selectedOption as { value: string })
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
