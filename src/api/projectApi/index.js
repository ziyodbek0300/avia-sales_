import axios from "axios";
import Cookies from 'js-cookie';

export const MainApi = process.env.NODE_ENV === "production" ? "https://travelcontinent.uz/api" : "http://localhost:5001";

const instance = axios.create({
    baseURL: `${MainApi}/`,
});

instance.interceptors.request.use(
    async (config) => {
        config.meta = config.meta || {};
        config.meta.requestStartedAt = new Date().getTime();
        config.headers = {
            ...config.headers,
            "Authorization": `Bearer ${Cookies.get("token")}`,
            "Content-Security-Policy": "upgrade-insecure-requests"
        };
        return config;
    },
    (error) => Promise.reject(error.response),
);

instance.interceptors.response.use(
    (response) => {
        console.log(
            `Execution time for: ${response.config.url} - ${new Date().getTime() - response.config.meta.requestStartedAt
            } ms`,
        );
        return response;
    },
    (error) => {
        return Promise.reject(error.response);
    },
);

export default instance;
