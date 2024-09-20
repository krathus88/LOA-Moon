import Accordion from "react-bootstrap/Accordion";
import { useAuth } from "@components/Authentication/useAuth";
import { Link } from "react-router-dom";
import { MAP_TO_IMAGE_FAQ } from "@utils/constants/general";

export function Setup() {
    const { login } = useAuth();

    return (
        <div>
            <h3 className="ms-2">Logs</h3>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>How do I upload logs?</Accordion.Header>
                    <Accordion.Body className="fw-light">
                        <p>
                            <span className="fw-bold">Note: </span>You have the option
                            between making the displayed name of the logs you upload
                            public or private. For more information, please refer to{" "}
                            <a href="#CharacterManagement">
                                Character Management section
                            </a>
                            .
                        </p>
                        <ol>
                            <li>
                                Download the latest modified version of LOA Logs{" "}
                                <a
                                    href="https://github.com/krathus88/loa-logs/releases"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    here
                                </a>
                                .
                            </li>
                            <li>
                                Install it (you can keep the default LOA Logs meter in a
                                separate folder or replace it completely).
                            </li>
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
                                Generate an Access Token{" "}
                                <span className="fw-bold text-warning">
                                    (KEEP IT PRIVATE)
                                </span>
                                .
                                <img
                                    src={MAP_TO_IMAGE_FAQ["access_token"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                            </li>
                            <li>Copy the Access Token.</li>
                            <li>Run LOA Logs.</li>
                            <li>
                                On LOA Logs, navigate to Settings --{">"} Sync Tab.
                                <img
                                    src={MAP_TO_IMAGE_FAQ["settings"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                                <img
                                    src={MAP_TO_IMAGE_FAQ["sync"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                            </li>
                            <li>Paste the Access Token you generated earlier.</li>
                            <li>Enable Sync (LOA Moon).</li>
                        </ol>
                        <p className="fw-bold mb-0 mt-3">OPTIONAL</p>
                        <ul>
                            <li>Enable Auto Upload.</li>
                            <li>
                                Sync all past Logs. (Note: Only logs since 19-06-2024
                                are allowed)
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        I've followed all the steps to setup uploading logs but some
                        feature still doesn't work. Help?
                    </Accordion.Header>
                    <Accordion.Body className="fw-light">
                        <p>Make sure you followed all the steps correctly.</p>
                        <p>
                            If it still doesn't work after reviewing the steps, make
                            sure to join our{" "}
                            <a href="https://discord.gg/dVNBVNJUh5" target="_blank">
                                Discord
                            </a>{" "}
                            to get some help troubleshooting the issue.
                        </p>
                        <p>
                            Make sure to post it in{" "}
                            <a
                                href="https://discord.com/channels/1278117034756018319/1280244449313816687"
                                target="_blank">
                                #report-bugs
                            </a>{" "}
                            so we get back to you as soon as possible.
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        I don't want to Auto Upload nor Sync all past Logs but I still
                        want to upload SOME logs. What do I do?
                    </Accordion.Header>
                    <Accordion.Body className="fw-light">
                        You can manually upload individual logs.
                        <ol>
                            <li>Run the DPS Meter.</li>
                            <li>
                                On the DPS Meter, navigate to Encounter Logs.
                                <img
                                    src={MAP_TO_IMAGE_FAQ["encounter_logs"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                            </li>
                            <li>
                                Select a <span className="fw-bold">cleared</span>{" "}
                                encounter you wish to upload.
                            </li>
                            <li>
                                On the top tabs, click the Icon "Sync to LOA Moon".
                                <img
                                    src={MAP_TO_IMAGE_FAQ["sync_encounter"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                            </li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        I've lost my Access Token or it is compromised. What do I do
                        now?
                    </Accordion.Header>
                    <Accordion.Body className="fw-light">
                        You can safely disable the old token and create a new one.
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
                                Generate an Access Token{" "}
                                <span className="fw-bold text-warning">
                                    (KEEP IT PRIVATE)
                                </span>
                                .
                                <img
                                    src={MAP_TO_IMAGE_FAQ["access_token"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                            </li>
                            <li>Copy the Access Token.</li>
                            <li>Run LOA Logs.</li>
                            <li>
                                On LOA Logs, navigate to Settings --{">"} Sync Tab.
                                <img
                                    src={MAP_TO_IMAGE_FAQ["settings"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                                <img
                                    src={MAP_TO_IMAGE_FAQ["sync"]}
                                    className="rounded mb-1"
                                    loading="lazy"
                                />
                            </li>
                            <li>Paste the Access Token you generated earlier.</li>
                            <li>Enable Sync (LOA Moon).</li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
