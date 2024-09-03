import { FiltersType } from "@type/HomePageType";

type PlayerNameProps = {
    filters: FiltersType;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

export function PlayerName({ filters, setFilters }: PlayerNameProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div id="NameInput" className="form-floating">
            <input
                type="text"
                className="form-control"
                placeholder="p_name"
                id="p_name"
                name="p_name"
                value={filters.p_name}
                onChange={handleChange}
            />
            <label htmlFor="p_name" className="form-label">
                Player Name
            </label>
        </div>
    );
}
