import { Box, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function Component() {
    const error = useRouteError();

    // Narrow the type of error to safely access properties
    let errorMessage: string;
    if (isRouteErrorResponse(error)) {
        // When it's a valid RouteErrorResponse, access its properties
        errorMessage = error.statusText || "An unexpected error occurred.";
    } else if (error instanceof Error) {
        // When it's a standard JavaScript Error
        errorMessage = error.message;
    } else {
        // Fallback for any other kind of error
        errorMessage = "An unexpected error occurred.";
    }

    return (
        <main id="ErrorPage">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    textAlign: "center",
                    padding: 2,
                }}>
                <Typography variant="h3" color="error">
                    Oops! Something went wrong.
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    {errorMessage}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Please try refreshing the page or go back to the homepage.
                </Typography>
            </Box>
        </main>
    );
}

Component.displayName = "ErrorPage";
