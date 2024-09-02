import { SUPP_MAP } from "./constants";

export const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim(); // Use native JavaScript trim function
            if (cookie.startsWith(`${name}=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

type CookieOptions = {
    path?: string;
    expires?: Date;
    domain?: string;
    secure?: boolean;
    sameSite?: "Lax" | "Strict" | "None";
};

export function setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.path) {
        cookieString += `; path=${options.path}`;
    }
    if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
    } else {
        // Set default expiration if not provided
        const longevityInSeconds = 31449600; // 364 days
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + longevityInSeconds * 1000);
        cookieString += `; expires=${expirationDate.toUTCString()}`;
    }
    if (options.domain) {
        cookieString += `; domain=${options.domain}`;
    }
    if (options.secure) {
        cookieString += `; secure`;
    }
    if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
}

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
