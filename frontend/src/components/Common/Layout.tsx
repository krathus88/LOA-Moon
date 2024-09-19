import { Suspense } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { SideBar } from "./SideBar/Sidebar";
import { Box, LinearProgress } from "@mui/material";

export function Layout() {
    const navigation = useNavigation();

    return (
        <>
            <Header />
            <SideBar />
            {navigation.state === "loading" && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                    }}>
                    <LinearProgress sx={{ height: "3px" }} />
                </Box>
            )}
            <Suspense
                fallback={
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                        }}>
                        <LinearProgress sx={{ height: "3px" }} />
                    </Box>
                }>
                <Outlet />
            </Suspense>
            <Footer />
        </>
    );
}
