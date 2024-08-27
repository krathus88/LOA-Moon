import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@components/Common/Layout";

const HomePage = lazy(() =>
    import("@pages/HomePage").then((module) => ({
        default: module.Component,
    }))
);

const Tab1 = lazy(() =>
    import("@pages/Tab1").then((module) => ({
        default: module.Component,
    }))
);

const Tab2 = lazy(() =>
    import("@pages/Tab2").then((module) => ({
        default: module.Component,
    }))
);

const Tab3 = lazy(() =>
    import("@pages/Tab3").then((module) => ({
        default: module.Component,
    }))
);

const Tab4 = lazy(() =>
    import("@pages/Tab4").then((module) => ({
        default: module.Component,
    }))
);

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/tab1",
                element: <Tab1 />,
            },
            {
                path: "/tab2",
                element: <Tab2 />,
            },
            {
                path: "/tab3",
                element: <Tab3 />,
            },
            {
                path: "/tab4",
                element: <Tab4 />,
            },
        ],
    },
]);

export function App() {
    return <RouterProvider router={router} />;
}
