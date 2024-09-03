import { getCsrfToken } from "@utils/functions";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../config/axios";

export function Component() {
    const location = useLocation();
    const navigate = useNavigate();
    const isEffectCalled = useRef(false);

    useEffect(() => {
        const completeOAuth = async () => {
            const params = new URLSearchParams(location.search);

            const code = params.get("code");
            const state = params.get("state");

            // If the required query parameters are missing, redirect to homepage
            if (!code || !state) {
                console.error("Invalid OAuth callback attempt, missing code or state");
                navigate("/");
                return;
            }

            if (code && state) {
                const storedState = sessionStorage.getItem("oauth_state");

                // Check if the state matches
                if (state !== storedState) {
                    console.error("State does not match");
                    return;
                }

                try {
                    const csrfToken = await getCsrfToken();

                    await api.post(
                        `/auth/complete/`,
                        { code: code },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRFToken": csrfToken,
                            },
                        }
                    );

                    // Redirect to homepage or dashboard
                    navigate("/");
                } catch (error) {
                    console.error("OAuth authentication failed", error);
                    // Handle the error (e.g., display an error message)
                    navigate("/");
                }
            }
        };

        if (!isEffectCalled.current) {
            // Check if the effect was already called
            isEffectCalled.current = true;
            completeOAuth();
        }
    }, [location, navigate]);

    return <></>;
}

Component.displayName = "DiscordOAuthCallback";
