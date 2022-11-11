import axios from "axios";
import Cookies from 'js-cookie';

// export const MainApi = "http://smartsys.intouch.ae";
export const MainApi = "https://travelcontinent.uz/image";

const instance = axios.create({
    baseURL: `${MainApi}/`,
});

instance.interceptors.request.use(
    async (config) => {
        config.meta = config.meta || {};
        config.meta.requestStartedAt = new Date().getTime();
        config.headers = {
            ...config.headers,
            // // "Authorization": `Bearer ${Cookies.get("token")}`,
            // "Access-Control-Allow-Origin":"*",
            // "Access-Control-Allow-Credentials":'true',
            // "Referer":"http://samo.travel",
            // "partner_token": localStorage.getItem("partner_token"),
            "Access-Control-Allow-Origin" : "",
            "Allow": "GET",
            "Content-type": "application/x-www-form-urlencoded",
            "content-type": "application/x-www-form-urlencoded",
            "Content-Type": "Application/x-www-form-urlencoded",
            "asdads": "application/x-www-form-urlencoded",
            "Host":"smartsys.intouch.ae",
            "host":"smartsys.intouch.ae",
            "Origin":"http://travelcontinent.uz",
            "Cache-Control":"max-age=0",
            "Accept":"application/json, text/plain, */*"
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
