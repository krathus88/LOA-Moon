import { api } from "@config/axios";
import { FiltersType } from "@type/EncounterPreviewType";
import { EncounterPlayerDataType } from "@type/EncounterType";
import { PlayerRoleType } from "@type/GeneralType";
import { SUPP_MAP } from "@utils/constants/classes";
import { MAP_TO_IMAGE_OTHER, SKILL_ICON_BASE_URL } from "./constants/general";

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
        const csrf_response = await api.post("/auth/csrf");
        if (csrf_response.status === 200) {
            // Check if the CSRF token is returned as a cookie
            csrfToken = getCookie("csrftoken");

            // Fallback: Check the headers or response body if it's not in the cookies
            if (!csrfToken) {
                csrfToken = csrf_response.headers["x-csrftoken"];
            }

            if (csrfToken) {
                // Store the CSRF token as a cookie if not already present
                setCookie("csrftoken", csrfToken, {
                    path: "/",
                    secure: true,
                    sameSite: import.meta.env.MODE === "production" ? "None" : "Lax",
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

export const cleanFilters = (filters: Partial<FiltersType>) => {
    return Object.fromEntries(
        Object.entries(filters).filter(
            ([, value]) =>
                value !== "" && value !== -1 && value !== "high" && value !== "fast" // Clean Filters for default values
        )
    );
};

export const toQueryString = (filters: Partial<FiltersType>): string => {
    // Convert all filter values to strings
    const query = new URLSearchParams(
        Object.entries(filters).reduce<Record<string, string>>((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
        }, {})
    );
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

export function groupPlayersByParty(
    playersData: EncounterPlayerDataType[]
): Record<number, EncounterPlayerDataType[]> {
    return playersData.reduce((parties, player) => {
        // Ensure that the party_num is a number
        const partyNum = player.party_num;

        // Check if the party doesn't already exist, if not, initialize it
        if (!parties[partyNum]) {
            parties[partyNum] = []; // Initialize with an empty array
        }

        // Add the player to the appropriate party
        parties[partyNum].push(player);

        return parties; // Return the accumulated parties
    }, {} as Record<number, EncounterPlayerDataType[]>); // Explicitly specify the return type
}

export const getPlayerType = (classId: number): PlayerRoleType => {
    return (SUPP_MAP.get(classId) as PlayerRoleType) || "dps";
};

export const getIconVariants = (icon_path: string) => {
    // Check if icon_path == 'default'
    if (icon_path == "default" || !icon_path) {
        return [MAP_TO_IMAGE_OTHER["default-skill"]];
    }

    // Look for Arcana Cards
    if (icon_path.startsWith("ar_carddeck_tooltip_")) {
        // Change to "AR_CardDeck_ToolTip_" + number part of the original icon_path
        const numberPart = icon_path.slice(19); // Extract the part after "ar_carddeck_tooltip_"
        const transformedPath = `AR_CardDeck_ToolTip${numberPart}`;
        return [`${SKILL_ICON_BASE_URL}${transformedPath}`];
    }

    // Generate different possible formats for the icon
    const baseVariants = [
        icon_path, // Direct replacement if it matches
        icon_path
            .split("_")
            .map((part, index) =>
                index === 0
                    ? part.toUpperCase()
                    : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            )
            .join("_"), // Fully capitalize first word into Snake Case following words
        icon_path
            .split("_")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join("_"), // Capitalize first letter of each word in Snake Case
        icon_path.charAt(0).toUpperCase() + icon_path.slice(1).toLowerCase(), // Capitalize first letter
        icon_path.toUpperCase(), // All uppercase
        icon_path.toLowerCase(), // All lowercase
        MAP_TO_IMAGE_OTHER["default-skill"],
    ];

    return baseVariants.map((name) => `${SKILL_ICON_BASE_URL}${name}`);
};
