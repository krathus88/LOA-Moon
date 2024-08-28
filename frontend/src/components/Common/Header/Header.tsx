import { Link } from "react-router-dom";
import "./Header.css";
import { ThemeSwitch } from "./ThemeSwitch";
import { SITE_NAME } from "@globals/constants";

export function Header() {
    return (
        <header className="d-flex justify-content-between align-items-center mx-lg-5 mx-md-3 mx-2">
            <Link className="text-center no-link" to="/">
                <h1 className="fw-bold">{SITE_NAME}</h1>
            </Link>
            <ThemeSwitch />
        </header>
    );
}
