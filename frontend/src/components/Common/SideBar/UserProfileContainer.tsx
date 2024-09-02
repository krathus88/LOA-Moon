import { NavDropdown } from "react-bootstrap";
import { useAuth } from "@components/Authentication/useAuth";
import { Link } from "react-router-dom";

export function UserProfileContainer() {
    const { logout } = useAuth();

    return (
        <NavDropdown
            title={
                <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="24"
                    height="24"
                    className="rounded-circle"
                />
            }
            id="nav-dropdown"
            align="end" // Adjust alignment if necessary
        >
            <NavDropdown.Item as={Link} to="/profile">
                Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
        </NavDropdown>
    );
}
