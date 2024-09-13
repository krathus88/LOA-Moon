import { useState } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MAP_TO_IMAGE_OTHER, SITE_NAME } from "@utils/constants/general";
import "./Header.css";
import { PageTab } from "./PageTab";
import { ThemeSwitch } from "./ThemeSwitch";

export function Header() {
    const [expanded, setExpanded] = useState(false);

    return (
        <header>
            <Navbar expanded={expanded} expand="md" className="mx-lg-5 mx-md-3 mx-2">
                <div className="mx-auto">
                    <Navbar.Brand
                        className="text-center no-link"
                        id="Logo"
                        as={Link}
                        to="/"
                        onClick={() => setExpanded(false)}>
                        <img src={MAP_TO_IMAGE_OTHER["logo"]} alt="Logo"></img>
                        <h1 className="font-special">{SITE_NAME}</h1>
                    </Navbar.Brand>
                </div>

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
                            Tab1
                        </PageTab>
                        <PageTab url="/tab2" setExpanded={setExpanded}>
                            Tab2
                        </PageTab>
                        <PageTab url="/tab3" setExpanded={setExpanded}>
                            Tab3
                        </PageTab>
                        <PageTab url="/tab4" setExpanded={setExpanded}>
                            Tab4
                        </PageTab>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
