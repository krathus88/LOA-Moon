import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@components/Common/Layout";
import { AuthProvider } from "@components/Authentication/AuthContext";
import { OAuthCallback } from "@components/Authentication/OAuthCallback";

const HomePage = lazy(() =>
    import("@pages/HomePage").then((module) => ({
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
        ],
    },
    {
        path: "/auth/callback",
        element: <OAuthCallback />,
    },
]);

export function App() {
    return <RouterProvider router={router} />;
}
