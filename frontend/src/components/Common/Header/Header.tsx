import { useState } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MAP_TO_IMAGE_OTHER, SITE_NAME } from "@utils/constants/general";
import "./Header.css";
import { PageTab } from "./PageTab";
import { ThemeSwitch } from "./ThemeSwitch";
import { useAuth } from "@components/Authentication/useAuth";

export function Header() {
    const { user, login } = useAuth();

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
                {/* <ThemeSwitch /> */}
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : true)}
                />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="justify-content-end text-center">
                    <ul className="navbar-nav mb-2 mb-md-0 rounded">
                        <PageTab url="/latest" setExpanded={setExpanded}>
                            Latest
                        </PageTab>
                        <PageTab url="/class-rankings" setExpanded={setExpanded}>
                            Class Rankings
                        </PageTab>
                        <PageTab url="/party-rankings" setExpanded={setExpanded}>
                            Party Rankings
                        </PageTab>
                        <PageTab url="/faq" setExpanded={setExpanded}>
                            FAQ
                        </PageTab>
                        <hr />
                        {user ? (
                            <PageTab url="/profile" setExpanded={setExpanded}>
                                Profile
                            </PageTab>
                        ) : (
                            <a
                                href="#"
                                onClick={login}
                                className="d-flex align-items-center justify-content-center nav-link no-link">
                                Login
                            </a>
                        )}
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
