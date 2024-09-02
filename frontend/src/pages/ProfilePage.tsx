import { useRequireAuth } from "@components/Authentication/useRequireAuth";
import "@components/Profile/Profile.css";
import { api } from "@config/axios";
import { useState } from "react";
import { getCsrfToken } from "@utils/functions";

export function Component() {
    useRequireAuth();

    const [value, setValue] = useState("");

    const handleGenerate = async () => {
        try {
            const csrfToken = await getCsrfToken();

            const response = await api.post(
                `/user/atoken/generate`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                }
            );

            setValue(response.data["access_token"]);
        } catch (error) {
            console.error("Error generating value:", error);
        }
    };

    const handleRevoke = async () => {
        try {
            const csrfToken = await getCsrfToken();

            await api.post(
                "/user/atoken/revoke",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                }
            );

            setValue("(unset)");
        } catch (error) {
            console.error("Error revoking value:", error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
    };

    return (
        <main>
            <div className="container my-5">
                <div>
                    <h5>Access Token</h5>
                    <div className="form-group input-with-button">
                        <input
                            type="text"
                            value={value}
                            readOnly
                            className="form-control"
                            placeholder="(hidden)"
                            id="accessToken"
                        />
                        <button onClick={handleCopy} className="btn btn-copy">
                            Copy
                        </button>
                    </div>
                    <div className="mt-3">
                        <button
                            onClick={handleGenerate}
                            className="btn btn-success me-2">
                            Generate
                        </button>
                        <button onClick={handleRevoke} className="btn btn-danger">
                            Revoke
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

Component.displayName = "ProfilePage";
