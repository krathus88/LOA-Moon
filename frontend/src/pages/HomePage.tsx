import "@components/Home/Home.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Component() {
    const navigate = useNavigate();

    const handleGuidesClick = () => {
        navigate("/faq");
    };

    return (
        <main>
            <div className="container text-center my-5">
                <h2 className="">Welcome to LOA Moon</h2>
                <p>
                    Lost Ark's unofficial logs website
                    <br />
                    In here you can upload your logs and see how you fare against other
                    players
                </p>
                <Button
                    component="a"
                    href="https://github.com/krathus88/loa-logs/releases/tag/Latest"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    sx={{
                        backgroundColor: "#dd8050",
                        color: "#fff",
                        width: "125px",
                        height: "50px",
                        fontSize: "1.125rem",
                        marginTop: "2.5rem",
                    }}>
                    Download
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#dd8050",
                        color: "#fff",
                        width: "125px",
                        height: "50px",
                        fontSize: "1.125rem",
                        marginTop: "2.5rem",
                        marginLeft: "1.5rem",
                    }}
                    onClick={handleGuidesClick}>
                    Guides
                </Button>
                <div style={{ marginTop: "5rem" }}></div>
            </div>
        </main>
    );
}

Component.displayName = "HomePage";
