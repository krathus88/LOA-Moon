import axios from "axios";

export const fetchData = async (
    method: string,
    url: string,
    params?: {
        puuid?: string;
        region?: string;
        summoner_name?: string;
        summoner_tag?: string;
        start?: string;
        num_games?: string;
        lastMatch?: string;
    }
) => {
    try {
        const response = await axios({
            method,
            url,
            params,
        });

        return response.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw error;
            } else if (error.request) {
                console.error("Network Error:", error.request);
                throw error.response;
            } else {
                console.error("Error:", error.message);
            }
        }

        throw error;
    }
};

export function getIcon(iconNumber: number) {
    return new URL(`../assets/classes/${iconNumber}.png`, import.meta.url).href;
}

export function getRaidWallpaper(raidName: string) {
    return new URL(`../assets/raids/${raidName}.webp`, import.meta.url).href;
}
