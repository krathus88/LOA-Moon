import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isDev = mode === "development";

    return {
        base: isDev ? "/" : "/static/frontend/",
        plugins: [react(), svgr()],
        server: {
            host: process.env.VITE_FRONTEND_DOMAIN || "127.0.0.1",
        },
        build: {
            outDir: "dist",
        },
        resolve: {
            alias: {
                "@assets": path.resolve(__dirname, "./src/assets"),
                "@components": path.resolve(__dirname, "./src/components"),
                "@pages": path.resolve(__dirname, "./src/pages"),
                "@type": path.resolve(__dirname, "./src/types"),
                "@utils": path.resolve(__dirname, "./src/utils"),
                "@config": path.resolve(__dirname, "./src/config"),
                "@icons": path.resolve(__dirname, "./src/components/Common/Icons"),
                "@store": path.resolve(__dirname, "./src/store"),
            },
        },
    };
});
