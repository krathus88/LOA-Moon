import Accordion from "react-bootstrap/Accordion";

export function Other() {
    return (
        <div>
            <h3 className="ms-2">Other</h3>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        I want to contribute to this project. How can i start?
                    </Accordion.Header>
                    <Accordion.Body className="fw-light">
                        <p>
                            This is a public project. You can find more about it here:{" "}
                            <a
                                href="https://github.com/krathus88/LOA-Moon"
                                target="_blank">
                                LOA Moon
                            </a>
                            .
                        </p>
                        <p>
                            Simply Fork the repository and when you have some
                            interesting concept to share make a Pull Request!
                        </p>
                        <p>
                            Can also reach out to us through our{" "}
                            <a href="https://discord.gg/dVNBVNJUh5" target="_blank">
                                Discord
                            </a>
                            .
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Cool concept. I want to keep this project going. How can i help?
                    </Accordion.Header>
                    <Accordion.Body className="fw-light">
                        <p>Coming soon...</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
