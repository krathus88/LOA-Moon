import { useEffect, useState } from "react";

export function ThemeSwitch() {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme ? storedTheme : "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <div className="d-flex align-items-center me-3" id="themeSwitch">
            <input
                type="checkbox"
                id="toggle_checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
            />
            <label htmlFor="toggle_checkbox">
                <div id="star">
                    <div className="star" id="star-1">
                        ★
                    </div>
                    <div className="star" id="star-2">
                        ★
                    </div>
                </div>
                <div id="moon"></div>
            </label>
        </div>
    );
}
