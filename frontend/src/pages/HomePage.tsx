import "@components/Home/Home.css";
import { Button } from "@mui/material";
import "@components/Latest/SearchFilters/SearchFilters.css";

export function Component() {
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
                    }}>
                    Guides
                </Button>
                <div style={{ marginTop: "5rem" }}></div>
            </div>
        </main>
    );
}

Component.displayName = "HomePage";
