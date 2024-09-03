import React from "react";
import { FiltersType } from "@type/HomePageType";

type DateProps = {
    label: string;
    type: "date_from" | "date_until";
    filters: FiltersType;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
    // Added type prop
};

export function Date({ label, type, filters, setFilters }: DateProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="form-floating">
            <input
                type="date"
                className="form-control"
                id={type}
                name={type}
                value={filters[type]}
                onChange={handleChange}
            />
            <label htmlFor={type} className="form-label">
                {label}
            </label>
        </div>
    );
}
