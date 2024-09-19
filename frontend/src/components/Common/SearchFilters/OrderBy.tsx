import React from "react";

type OrderByProps = {
    value: string | null;
    onChange: (fieldName: string, newValue: string) => void;
    option1_value: string;
    option2_value: string;
    option1_text: string;
    option2_text: string;
};

export function OrderBy({
    value,
    option1_value,
    option2_value,
    option1_text,
    option2_text,
    onChange,
}: OrderByProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, newValue: string) => {
        e.preventDefault();
        onChange("order_by", newValue);
    };

    return (
        <div>
            <button
                className={`${value === option1_value ? "active" : ""}`}
                onClick={(e) => handleClick(e, option1_value)}>
                {option1_text}
            </button>
            <button
                className={`${value === option2_value ? "active" : ""}`}
                onClick={(e) => handleClick(e, option2_value)}>
                {option2_text}
            </button>
        </div>
    );
}
