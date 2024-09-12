import { useAuth } from "@components/Authentication/useAuth";
import { useRequireAuth } from "@components/Authentication/useRequireAuth";
import { Loading } from "@components/Common/Loading";
import { AccessToken } from "@components/Profile/AccessToken";
import "@components/Profile/Profile.css";
import { useEffect, useState } from "react";
import { CharacterManager } from "@components/Profile/CharacterManager/CharacterManager";

export function Component() {
    const { fetchUser, loading } = useAuth();
    const [hasFetchedUser, setHasFetchedUser] = useState(false);

    useEffect(() => {
        if (!hasFetchedUser && !loading) {
            const fetchData = async () => {
                await fetchUser();
                setHasFetchedUser(true);
            };

            fetchData();
        }
    }, [fetchUser, hasFetchedUser, loading]);

    useRequireAuth();

    if (!hasFetchedUser) return <Loading />;

    return (
        <main>
            <div className="container my-5">
                <AccessToken />
                <CharacterManager />
            </div>
        </main>
    );
}

Component.displayName = "ProfilePage";
