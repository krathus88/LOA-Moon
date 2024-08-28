import { Link } from "react-router-dom";
import "./SideBar.css";
import { DiscordIcon } from "@components/Common/Icons/DiscordIcon";

export function SideBar() {
    return (
        <div className="d-flex flex-column flex-shrink-0" id="SideNavigationBar">
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li>
                    <Link
                        to="/Tab1"
                        className="nav-link py-3 border-bottom rounded-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        aria-label="Dashboard"
                        data-bs-original-title="Dashboard">
                        Tab1
                    </Link>
                </li>
                <li>
                    <Link
                        to="/Tab2"
                        className="nav-link py-3 border-bottom rounded-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        aria-label="Orders"
                        data-bs-original-title="Orders">
                        Tab2
                    </Link>
                </li>
                <li>
                    <Link
                        to="/Tab3"
                        className="nav-link py-3 border-bottom rounded-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        aria-label="Products"
                        data-bs-original-title="Products">
                        Tab3
                    </Link>
                </li>
                <li>
                    <Link
                        to="/Tab4"
                        className="nav-link py-3 rounded-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        aria-label="Customers"
                        data-bs-original-title="Customers">
                        Tab4
                    </Link>
                </li>
            </ul>
            <div className="border-top mt-auto" id="SideBarContacts">
                <a
                    href="https://discord.gg/dVNBVNJUh5"
                    target="_blank"
                    className="d-flex align-items-center justify-content-center no-link mt-2">
                    <DiscordIcon />
                </a>
            </div>
        </div>
    );
}
