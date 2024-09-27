import { getCsrfToken } from "@utils/functions";
import React, { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../config/axios";
import { User } from "@type/CharactersType";

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Retrieve user data from storage if it exists
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await api.get("/user/");
            const userData = response.data;
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        } catch {
            setUser(null);
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        const state = uuidv4();
        sessionStorage.setItem("oauth_state", state);

        const authUrl = import.meta.env.VITE_DISCORD_LOGIN_URL + `&state=${state}`;

        window.location.href = authUrl;
    };

    const logout = async () => {
        try {
            const csrfToken = await getCsrfToken();

            await api.post(
                "/auth/logout/",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                }
            );
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, setUser, login, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};
