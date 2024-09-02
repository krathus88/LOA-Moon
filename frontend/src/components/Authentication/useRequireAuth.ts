import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useRequireAuth = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user === null) {
            navigate("/"); // Redirect to home if not authenticated
        }
    }, [user, loading, navigate]);
};
