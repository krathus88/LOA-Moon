import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./Header.css";
import { ThemeSwitch } from "./ThemeSwitch";
import { PageTab } from "./PageTab";
import { SITE_NAME } from "@globals/constants";

export function Header() {
    const [expanded, setExpanded] = useState(false);

    return (
        <header>
            <Navbar expanded={expanded} expand="md" className="mx-lg-5 mx-md-3 mx-2">
                <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
                    <h1 className="fw-bold">{SITE_NAME}</h1>
                </Navbar.Brand>
                <ThemeSwitch />
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : true)}
                />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="justify-content-end text-center">
                    <ul className="navbar-nav mb-2 mb-md-0 rounded">
                        <PageTab url="/tab1" setExpanded={setExpanded}>
                            Tab 1
                        </PageTab>
                        <PageTab url="/tab2" setExpanded={setExpanded}>
                            Tab 2
                        </PageTab>
                        <PageTab url="/tab3" setExpanded={setExpanded}>
                            Tab 3
                        </PageTab>
                        <PageTab url="/tab4" setExpanded={setExpanded}>
                            Tab 4
                        </PageTab>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
