import React, { useCallback } from "react";

type DateProps = {
    label: string;
    type: "date_from" | "date_until";
    value: string | null;
    onChange: (fieldName: string, newValue: string) => void;
};

export function Date({ label, type, value, onChange }: DateProps) {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value: newValue } = e.target;
            onChange(type, newValue);
        },
        [type, onChange]
    );

    return (
        <div className="form-floating">
            <input
                type="date"
                className="form-control"
                id={type}
                name={type}
                value={value || ""}
                onChange={handleChange}
            />
            <label htmlFor={type} className="form-label">
                {label}
            </label>
        </div>
    );
}
