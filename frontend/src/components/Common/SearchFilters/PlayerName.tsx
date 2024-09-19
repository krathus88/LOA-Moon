import { useCallback } from "react";

type PlayerNameProps = {
    value: string | null;
    onChange: (fieldName: string, newValue: string) => void;
};

export function PlayerName({ value, onChange }: PlayerNameProps) {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value: newValue } = e.target;
            onChange(name, newValue); // Pass both field name and value
        },
        [onChange]
    );

    return (
        <div id="NameInput" className="form-floating">
            <input
                type="text"
                className="form-control"
                placeholder="p_name"
                id="p_name"
                name="p_name"
                value={value || ""}
                onChange={handleChange}
            />
            <label htmlFor="p_name" className="form-label">
                Player Name
            </label>
        </div>
    );
}
