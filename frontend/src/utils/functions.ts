import { FiltersType } from "@type/HomePageType";
import { SUPP_MAP } from "./constants";
import { api } from "@config/axios";

export const getCookie = (name: string): string | undefined => {
    let cookieValue: string | undefined = undefined; // Start with undefined

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

export const getCsrfToken = async (): Promise<string | undefined> => {
    let csrfToken = getCookie("csrftoken");

    if (!csrfToken) {
        const csrf_response = await api.post("/csrf");
        if (csrf_response.status === 200) {
            // Check if the CSRF token is returned as a cookie
            csrfToken = getCookie("csrftoken");

            // Fallback: Check the headers or response body if it's not in the cookies
            if (!csrfToken) {
                csrfToken = csrf_response.headers["x-csrftoken"] || csrf_response.data;
            }

            if (csrfToken) {
                // Store the CSRF token as a cookie if not already present
                setCookie("csrftoken", csrfToken, {
                    path: "/",
                    secure: true,
                    sameSite: "Lax",
                    domain:
                        import.meta.env.MODE === "production"
                            ? import.meta.env.VITE_BACKEND_DOMAIN
                            : undefined,
                });
            }
        }
    }

    return csrfToken;
};

export const toQueryString = (filters: FiltersType): string => {
    const query = new URLSearchParams(filters as Record<string, string>);
    return query.toString();
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
