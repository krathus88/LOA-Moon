import { CircularProgress } from "@mui/material";

export function Loading() {
    return (
        <div className="text-center my-3">
            <CircularProgress color="inherit" />
        </div>
    );
}
