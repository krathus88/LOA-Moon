import { useEffect, useState } from "react";
import { MoonIcon } from "@icons/MoonIcon";
import { SunIcon } from "@icons/SunIcon";

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
            <SunIcon />
            <span style={{ marginRight: "7px" }}></span>
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheck"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheck"></label>
            </div>
            <MoonIcon />
        </div>
    );
}
