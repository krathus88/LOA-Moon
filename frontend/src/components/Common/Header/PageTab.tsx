import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

type PageTabProps = {
    url: string;
    setExpanded: (expanded: boolean) => void;
    children: React.ReactNode;
};

export function PageTab({ url, setExpanded, children }: PageTabProps) {
    return (
        <li className="nav-item rounded-2">
            <Nav.Link
                as={Link}
                to={url}
                className="fw-bold"
                onClick={() => setExpanded(false)}>
                {children}
            </Nav.Link>
        </li>
    );
}
