import axios from "axios";

export const MainApi = "http://localhost";
// export const MainApi = "http://localhost:5001/roofing-fb362/us-central1";

const instance = axios.create({
    baseURL: `${MainApi}/`,
});

instance.interceptors.request.use(
    async (config) => {
        config.meta = config.meta || {};
        config.meta.requestStartedAt = new Date().getTime();
        config.headers = {
            ...config.headers,
            // "Authtori"
        };
        return config;
    },
    (error) => Promise.reject(error.response),
);

instance.interceptors.response.use(
    (response) => {
        console.log(
            `Execution time for: ${response.config.url} - ${
                new Date().getTime() - response.config.meta.requestStartedAt
            } ms`,
        );
        return response;
    },
    (error) => {
        return Promise.reject(error.response);
    },
);

export default instance;
