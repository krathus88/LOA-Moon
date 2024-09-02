import "./config/axios.ts"; // Axios Config
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const rootElement = document.getElementById("root");

if (import.meta.env.MODE === "production") {
    // Render without StrictMode in production
    ReactDOM.createRoot(rootElement!).render(<App />);
} else {
    // Render with StrictMode in development
    ReactDOM.createRoot(rootElement!).render(<App />);
}
