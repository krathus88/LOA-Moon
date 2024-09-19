import { useAuth } from "@components/Authentication/useAuth";
import { MAP_TO_IMAGE_OTHER } from "@utils/constants/general";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginIcon } from "../Icons/LoginIcon";

type UserProfileContainerProps = {
    isExpanded: boolean;
};

export function UserProfileContainer({ isExpanded }: UserProfileContainerProps) {
    const { user, login, logout } = useAuth();

    // Check if user is null or undefined
    if (!user) {
        return (
            <a
                onClick={login}
                className="nav-link py-3 rounded-0 no-link mt-2 hover-pointer">
                <LoginIcon />
                {isExpanded && <span className="label-text">Login</span>}
            </a>
        );
    }

    return (
        <NavDropdown
            title={
                <>
                    <img
                        src={user?.avatar || MAP_TO_IMAGE_OTHER["default-avatar"]}
                        alt="mdo"
                        width="32"
                        height="32"
                        className="rounded-circle"
                    />
                    {isExpanded && <span className="label-text">Profile</span>}
                </>
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
