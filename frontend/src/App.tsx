import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@components/Common/Layout";
import { AuthProvider } from "@components/Authentication/AuthContext";

const HomePage = lazy(() =>
    import("@pages/HomePage").then((module) => ({
        default: module.Component,
    }))
);

const LatestPage = lazy(() =>
    import("@pages/LatestPage").then((module) => ({
        default: module.Component,
    }))
);

const ClassRankingsPage = lazy(() =>
    import("@pages/ClassRankingsPage").then((module) => ({
        default: module.Component,
    }))
);

const PartyRankingsPage = lazy(() =>
    import("@pages/PartyRankingsPage").then((module) => ({
        default: module.Component,
    }))
);

const FaqPage = lazy(() =>
    import("@pages/FaqPage").then((module) => ({
        default: module.Component,
    }))
);

const ProfilePage = lazy(() =>
    import("@pages/ProfilePage").then((module) => ({
        default: module.Component,
    }))
);

const DiscordOAuthCallbackPage = lazy(() =>
    import("@pages/DiscordOAuthCallbackPage").then((module) => ({
        default: module.Component,
    }))
);

const router = createBrowserRouter([
    {
        element: (
            <AuthProvider>
                <Layout />
            </AuthProvider>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/latest",
                element: <LatestPage />,
            },
            {
                path: "/class-rankings",
                element: <ClassRankingsPage />,
            },
            {
                path: "/party-rankings",
                element: <PartyRankingsPage />,
            },
            {
                path: "/faq",
                element: <FaqPage />,
            },
            {
                path: "/encounter/:encounter_id",
                async lazy() {
                    const { Component } = await import("@pages/EncounterPage");
                    return { loader: Component.loader, Component };
                },
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: "/auth/callback",
        element: <DiscordOAuthCallbackPage />,
    },
]);

export function App() {
    return <RouterProvider router={router} />;
}
