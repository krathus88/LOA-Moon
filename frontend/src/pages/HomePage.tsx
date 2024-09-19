import "@components/Home/Home.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ContentsContainer } from "@components/Home/ContentsContainer";
import { MAP_TO_IMAGE_OTHER } from "@utils/constants/general";

export function Component() {
    const navigate = useNavigate();

    const handleGuidesClick = () => {
        navigate("/faq");
    };

    return (
        <main id="HomePage">
            <div
                className="container-xl container-fluid-md text-center"
                id="HomeHeader">
                <img className="shadow-lg" src={MAP_TO_IMAGE_OTHER["wallpaper"]} />
                <div>
                    <h2 className="">Welcome to LOA Moon</h2>
                    <p>
                        Lost Ark's unofficial logs website
                        <br />
                        <br />
                        In here you can upload your logs and see how you fare against
                        other players
                    </p>
                </div>
                <Button
                    component="a"
                    href="https://github.com/krathus88/loa-logs/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained">
                    Download
                </Button>
                <Button variant="contained" onClick={handleGuidesClick}>
                    Guides
                </Button>
            </div>
            <ContentsContainer />
        </main>
    );
}

Component.displayName = "HomePage";
