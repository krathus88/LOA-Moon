import { getCsrfToken } from "@utils/functions";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../config/axios";

export interface User {
    id: string;
    username: string;
}

export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

// Create a context with a default value that will be overwritten
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("http://127.0.0.1:8000/api/user/");

                setUser(response.data);
            } catch {
                setUser(null);
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
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
