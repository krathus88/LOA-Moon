import axios from "axios";

// Setting CSRF token configuration
axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

// Set the baseURL and timeout dynamically based on environment
let djangoURL = "http://127.0.0.1:8000/api";
let defaultTimeout = 30000;

if (import.meta.env.PROD) {
    // Checks if the environment is production
    djangoURL = import.meta.env.VITE_BACKEND_API;
    defaultTimeout = 10000;
}

axios.defaults.baseURL = djangoURL;
axios.defaults.timeout = defaultTimeout;

// Create an Axios instance
const api = axios.create();

export { api };
