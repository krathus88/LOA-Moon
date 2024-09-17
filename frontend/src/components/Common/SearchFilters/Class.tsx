import { CLASS_GROUPS } from "@utils/constants/classes";
import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { useCallback, useMemo } from "react";
import Select, { StylesConfig } from "react-select";

type ClassProps = {
    value: number | null;
    onChange: (fieldName: string, newValue: number | string) => void;
    selectStyle: StylesConfig;
};

export function Class({ value, onChange, selectStyle }: ClassProps) {
    const handleClassChange = useCallback(
        (selectedOption: { value: number } | null) => {
            if (selectedOption) {
                onChange("p_class_id", selectedOption.value);
                onChange("p_spec", ""); // Reset specialization when class changes
            } else {
                onChange("p_class_id", -1); // Default value when no class is selected
                onChange("p_spec", ""); // Reset specialization
            }
        },
        [onChange]
    );

    // Map class options with images
    const classOptions = useMemo(() => {
        return CLASS_GROUPS.map((group) => ({
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
    }, []);

    // Find the currently selected value
    const classSelectValue = useMemo(() => {
        return (
            CLASS_GROUPS.flatMap((group) => group.options).find(
                (option) => option.value === value
            ) || null
        );
    }, [value]);

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
