import { CircularProgress } from "@mui/material";

export function Loading() {
    return (
        <div className="w-100 text-center my-3">
            <CircularProgress color="inherit" />
        </div>
    );
}
