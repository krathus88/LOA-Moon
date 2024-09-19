import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./SideBar.css";
import { DiscordIcon } from "@components/Common/Icons/DiscordIcon";
import { ClassRankingsIcon } from "../Icons/ClassRankingsIcon";
import { PartyRankingsIcon } from "../Icons/PartyRankingsIcon";
import { FaqIcon } from "../Icons/FaqIcon";
import { UserProfileContainer } from "./UserProfileContainer";
import { RecentIcon } from "../Icons/RecentIcon";

export function SideBar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className={`d-flex flex-column flex-shrink-0 ${
                isExpanded ? "expanded" : ""
            }`}
            id="SideNavigationBar">
            <Button
                onClick={toggleSidebar}
                className="toggle-button"
                aria-controls="SideNavigationBar"
                aria-expanded={isExpanded}>
                {isExpanded ? "<" : ">"}
            </Button>
            <ul className="nav nav-flush flex-column text-center">
                <li>
                    <Link
                        to="/latest"
                        className="nav-link py-3 border-bottom rounded-0 no-link"
                        aria-label="Latest"
                        data-bs-original-title="Latest">
                        <RecentIcon />
                        {isExpanded && <span className="label-text">Latest</span>}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/class-rankings"
                        className="nav-link py-3 border-bottom rounded-0 no-link"
                        aria-label="Class Rankings"
                        data-bs-original-title="Class Rankings">
                        <ClassRankingsIcon />
                        {isExpanded && (
                            <span className="label-text">Class Rankings</span>
                        )}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/party-rankings"
                        className="nav-link py-3 border-bottom rounded-0 no-link"
                        aria-label="Party Rankings"
                        data-bs-original-title="Party Rankings">
                        <PartyRankingsIcon />
                        {isExpanded && (
                            <span className="label-text">Party Rankings</span>
                        )}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/faq"
                        className="nav-link py-3 rounded-0 no-link"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        aria-label="FAQ"
                        data-bs-original-title="FAQ">
                        <FaqIcon />
                        {isExpanded && <span className="label-text">FAQ</span>}
                    </Link>
                </li>
            </ul>
            <ul
                className="nav nav-flush flex-column text-center border-top mt-auto"
                id="SideBarContacts">
                <li>
                    <a
                        href="https://discord.gg/dVNBVNJUh5"
                        target="_blank"
                        className="nav-link py-3 rounded-0 no-link">
                        <DiscordIcon />
                        {isExpanded && <span className="label-text">Discord</span>}
                    </a>
                </li>
            </ul>
            <ul
                className="nav nav-flush flex-column text-center mt-auto mb-4"
                id="SideBarProfile">
                <li>
                    <UserProfileContainer isExpanded={isExpanded} />
                </li>
            </ul>
        </div>
    );
}
