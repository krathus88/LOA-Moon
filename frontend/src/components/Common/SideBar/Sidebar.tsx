import { Link } from "react-router-dom";
import "./SideBar.css";
import { DiscordIcon } from "@components/Common/Icons/DiscordIcon";
import { ClassRankingsIcon } from "../Icons/ClassRankingsIcon";
import { PartyRankingsIcon } from "../Icons/PartyRankingsIcon";
import { FaqIcon } from "../Icons/FaqIcon";
import { UserProfileContainer } from "./UserProfileContainer";
import { RecentIcon } from "../Icons/RecentIcon";

export function SideBar() {
    return (
        <div className="d-flex flex-column flex-shrink-0" id="SideNavigationBar">
            <ul className="nav nav-flush flex-column text-center">
                <li>
                    <Link
                        to="/latest"
                        className="nav-link py-3 border-bottom rounded-0 no-link"
                        aria-label="Latest"
                        data-bs-original-title="Latest">
                        <RecentIcon />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/class-rankings"
                        className="nav-link py-3 border-bottom rounded-0 no-link"
                        aria-label="Class Rankings"
                        data-bs-original-title="Class Rankings">
                        <ClassRankingsIcon />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/party-rankings"
                        className="nav-link py-3 border-bottom rounded-0 no-link"
                        aria-label="Party Rankings"
                        data-bs-original-title="Party Rankings">
                        <PartyRankingsIcon />
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
                    </Link>
                </li>
            </ul>
            <ul className="nav nav-flush border-top mt-auto" id="SideBarContacts">
                <li>
                    <a
                        href="https://discord.gg/dVNBVNJUh5"
                        target="_blank"
                        className="d-flex align-items-center justify-content-center nav-link no-link mt-2">
                        <DiscordIcon />
                    </a>
                </li>
            </ul>
            <ul className="nav nav-flush mt-auto" id="SideBarProfile">
                <li>
                    <UserProfileContainer />
                </li>
            </ul>
        </div>
    );
}
