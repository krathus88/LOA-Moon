import Accordion from "react-bootstrap/Accordion";
import { useAuth } from "@components/Authentication/useAuth";
import { Link } from "react-router-dom";
import { MAP_TO_IMAGE_FAQ } from "@utils/constants/general";

export function CharacterManagement() {
    const { login } = useAuth();

    return (
        <div>
            <h3 className="ms-2">Character Management</h3>
            <Accordion id="CharacterManagement">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        I want to make the name in my character logs public. How do I do
                        this?
                    </Accordion.Header>
                    <Accordion.Body className="fw-light">
                        <ol>
                            <li>
                                <a onClick={login} className="hover-pointer">
                                    Login
                                </a>{" "}
                                on this Website with your Discord account.
                                <img
                                    src={MAP_TO_IMAGE_FAQ["login"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                            </li>
                            <li>
                                On this Website, navigate to{" "}
                                <Link to="/profile" target="_blank">
                                    Profile
                                </Link>
                                .
                                <img
                                    src={MAP_TO_IMAGE_FAQ["profile"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                            </li>
                            <li>
                                On the Character Manager, enable "Display Name on Log
                                Upload" and/or "Display Name in ALL previous Logs" for
                                the characters you want.
                                <img
                                    src={MAP_TO_IMAGE_FAQ["character_manager"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
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
