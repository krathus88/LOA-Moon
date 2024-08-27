import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@components": path.resolve(__dirname, "./src/components"),
                "@pages": path.resolve(__dirname, "./src/pages"),
                "@type": path.resolve(__dirname, "./src/types"),
                "@globals": path.resolve(__dirname, "./src/globals"),
            },
        },
    };
});
