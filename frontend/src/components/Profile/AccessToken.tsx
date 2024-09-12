import { api } from "@config/axios";
import { getCsrfToken } from "@utils/functions";
import { useState } from "react";

export function AccessToken() {
    const [value, setValue] = useState("");
    const [hasClicked, setHasClicked] = useState(false);

    const handleGenerate = async () => {
        try {
            setHasClicked(true);

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
        } finally {
            setHasClicked(false);
        }
    };

    const handleRevoke = async () => {
        try {
            setHasClicked(true);

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
        } finally {
            setHasClicked(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
    };

    return (
        <div className="mb-5" id="AccessToken">
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
                    disabled={hasClicked}
                    className="btn btn-success me-2">
                    Generate
                </button>
                <button
                    onClick={handleRevoke}
                    disabled={hasClicked}
                    className="btn btn-danger">
                    Revoke
                </button>
            </div>
        </div>
    );
}
