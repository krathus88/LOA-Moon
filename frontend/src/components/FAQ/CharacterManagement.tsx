import Accordion from "react-bootstrap/Accordion";
import { useAuth } from "@components/Authentication/useAuth";
import { Link } from "react-router-dom";

export function CharacterManagement() {
    const { login } = useAuth();

    return (
        <div>
            <h3 className="ms-2">Character Management</h3>
            <Accordion id="CharacterManagement">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        I want to make the name in my character logs public. How do i do
                        this?
                    </Accordion.Header>
                    <Accordion.Body className="fw-light">
                        <ol>
                            <li>
                                <a onClick={login} className="hover-pointer">
                                    Login
                                </a>{" "}
                                on this Website with your Discord account.
                            </li>
                            <li>
                                On this Website, navigate to{" "}
                                <Link to="/profile" target="_blank">
                                    Profile
                                </Link>
                                .
                            </li>
                            <li>
                                On the Character Manager, enable "Display Name on Log
                                Upload" for the characters you want.
                            </li>
                            <li>
                                On the Character Manager, enable "Display Name in ALL
                                previous Logs" for the characters you want.
                            </li>
                            <li>On the Character Manager, click the "Save" button.</li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        I want to make the name in only SOME of my character logs
                        public/private.
                    </Accordion.Header>
                    <Accordion.Body className="fw-light">
                        <p>Coming soon...</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
