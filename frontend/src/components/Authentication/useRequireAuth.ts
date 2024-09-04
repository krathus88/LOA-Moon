import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useRequireAuth = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            if (loading) return; // Do nothing while loading

            if (user === null) {
                navigate("/");
            }
        };

        checkAuthStatus();
    }, [user, loading, navigate]);
};
