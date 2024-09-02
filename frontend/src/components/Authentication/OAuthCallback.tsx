import { Loading } from "@components/Common/Loading";
import { getCookie, setCookie } from "@utils/functions";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../config/axios";

export const OAuthCallback: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const completeOAuth = async () => {
            const params = new URLSearchParams(location.search);

            const code = params.get("code");
            const state = params.get("state");

            if (code && state) {
                const storedState = sessionStorage.getItem("oauth_state");

                // Check if the state matches
                if (state !== storedState) {
                    console.error("State does not match");
                    return;
                }

                try {
                    let csrfToken = getCookie("csrftoken");

                    if (!csrfToken) {
                        const csrf_response = await api.post("/csrf");
                        if (csrf_response.status === 200) {
                            // Check if the CSRF token is returned as a cookie
                            csrfToken = getCookie("csrftoken");

                            // Fallback: Check the headers or response body if it's not in the cookies
                            if (!csrfToken) {
                                csrfToken =
                                    csrf_response.headers["x-csrftoken"] ||
                                    csrf_response.data;
                            }

                            if (csrfToken) {
                                // Store the CSRF token as a cookie if not already present
                                setCookie("csrftoken", csrfToken, {
                                    path: "/",
                                    // Replace with your backend's domain
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

        completeOAuth();
    }, [location, navigate]);

    return <Loading />;
};
