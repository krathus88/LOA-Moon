import "@components/Encounter/Encounter.css";
import { useParams } from "react-router-dom";
/* import { fetchData } from "@utils/functions";
import type { LoaderFunctionArgs } from "react-router-dom"; */

async function loader() {
    return "yes";
}

/* async function loader({ params }: LoaderFunctionArgs) {
    const { region, summonerNameTag } = params;

    if (!summonerNameTag || !region) {
        throw Error;
    }

    const [summonerName, summonerTag] = summonerNameTag.split("-");

    const responseData = await fetchData("get", "/api/summoners/", {
        region: region,
        summoner_name: summonerName,
        summoner_tag: summonerTag,
    });

    return responseData;
} */

export function Component() {
    const { encounter_id } = useParams();

    return (
        <main>
            <div className="container my-5">
                <p>Encounter {encounter_id}</p>
            </div>
        </main>
    );
}

Component.displayName = "EncounterPage";

Component.loader = loader;
