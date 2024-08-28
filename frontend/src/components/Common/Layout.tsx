import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { SideBar } from "./SideBar/Sidebar";
import { Box, LinearProgress } from "@mui/material";

export function Layout() {
    return (
        <>
            <Header />
            <SideBar />
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
