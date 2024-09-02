import { Loading } from "@components/Common/Loading";
import { getCsrfToken } from "@utils/functions";
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

        completeOAuth();
    }, [location, navigate]);

    return <Loading />;
};
