import React, { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../config/axios";
import { getCsrfToken } from "@utils/functions";

export interface User {
    name: string;
    avatar: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/user/");
                setUser(response.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

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
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
