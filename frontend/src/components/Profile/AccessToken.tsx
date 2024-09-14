import { api } from "@config/axios";
import { getCsrfToken } from "@utils/functions";
import { useState } from "react";
import { Button } from "@mui/material";

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
            <div className="gen-rev-container ms-1 mt-2">
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleGenerate}
                    disabled={hasClicked}
                    className="me-2"
                    sx={{
                        "&:disabled": {
                            backgroundColor: "#004d00",
                            color: "rgba(255, 255, 255, 0.6)",
                        },
                    }}>
                    Generate
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleRevoke}
                    disabled={hasClicked}
                    sx={{
                        "&.Mui-disabled": {
                            backgroundColor: "#791a1a",
                            color: "rgba(255, 255, 255, 0.6)",
                        },
                    }}>
                    Revoke
                </Button>
            </div>
        </div>
    );
}
