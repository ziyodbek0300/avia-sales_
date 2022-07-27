import axios from "axios";
import Cookies from 'js-cookie';

// export const MainApi = "http://smartsys.intouch.ae";
export const MainApi = "http://smartsys.intouch.ae";

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
            "Access-Control-Allow-Origin":"http://samo.travel",
            "Access-Control-Allow-Credentials":'true',
            "Referer":"http://samo.travel"
        };
        config.params = {
            ...config.params,
            form: "http://samo.travel",
            samo_action: "reference",
            partner_token: localStorage.getItem("partner_token"),

        }
        return config;
    },
    (error) => Promise.reject(error.response),
);

instance.interceptors.response.use(
    (response) => {
        console.log(
            `Samo Execution time for: ${response.config.url} - ${new Date().getTime() - response.config.meta.requestStartedAt
            } ms`,
        );
        return response;
    },
    (error) => {
        return Promise.reject(error.response);
    },
);

export default instance;