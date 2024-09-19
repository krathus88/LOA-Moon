import { MAP_TO_IMAGE_OTHER } from "@utils/constants/general";
import { ClassBackground } from "./ClassBackground";
import { Contents } from "./Contents";
import { LatestBackground2 } from "./LatestBackground2";
import { PartyBackground } from "./PartyBackground";

export function ContentsContainer() {
    return (
        <div id="ContentsContainer">
            <Contents
                label="Recent Uploads"
                url="/latest"
                imgUrl={MAP_TO_IMAGE_OTHER["latest2"]}>
                <LatestBackground2 />
            </Contents>
            <Contents
                label="Class Rankings"
                url="/class-rankings"
                imgUrl={MAP_TO_IMAGE_OTHER["class-rankings"]}>
                <ClassBackground />
            </Contents>
            <Contents
                label="Party Rankings"
                url="/party-rankings"
                imgUrl={MAP_TO_IMAGE_OTHER["party-rankings"]}>
                <PartyBackground />
            </Contents>
        </div>
    );
}
