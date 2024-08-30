import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [react(), svgr()],
        resolve: {
            alias: {
                "@assets": path.resolve(__dirname, "./src/assets"),
                "@components": path.resolve(__dirname, "./src/components"),
                "@pages": path.resolve(__dirname, "./src/pages"),
                "@type": path.resolve(__dirname, "./src/types"),
                "@utils": path.resolve(__dirname, "./src/utils"),
            },
        },
    };
});
