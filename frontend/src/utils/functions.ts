import axios from "axios";
import { SUPP_MAP } from "./constants";

const BASE_URL = import.meta.env.VITE_BACKEND_API;

export const fetchData = async (
    method: string,
    endpoint: string,
    params?: {
        filter1?: string;
        filter2?: string;
        filter3?: string;
    }
) => {
    try {
        const url = `${BASE_URL}${endpoint}`;

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

export function chunkArrayIntoParties<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

export const getPlayerType = (classId: number): string => {
    return SUPP_MAP.get(classId) || "dps";
};
