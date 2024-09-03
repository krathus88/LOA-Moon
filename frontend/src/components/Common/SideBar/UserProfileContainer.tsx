import { NavDropdown } from "react-bootstrap";
import { useAuth } from "@components/Authentication/useAuth";
import { Link } from "react-router-dom";
import { LoginIcon } from "../Icons/LoginIcon";

export function UserProfileContainer() {
    const { user, login, logout } = useAuth();

    // Check if user is null or undefined
    if (!user) {
        return (
            <a
                onClick={login}
                className="d-flex align-items-center justify-content-center nav-link no-link mt-2">
                <LoginIcon />
            </a>
        );
    }

    const avatarUrl = user?.avatar || "/default-avatar.webp";

    return (
        <NavDropdown
            title={
                <img
                    src={avatarUrl}
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                />
            }
            id="profile-dropdown"
            align="end">
            <NavDropdown.Item as={Link} to="/profile">
                Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
        </NavDropdown>
    );
}
