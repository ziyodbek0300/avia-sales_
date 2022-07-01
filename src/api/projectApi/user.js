import axios from ".";

export default {
    register: (body) => axios.post("register", body),
    login: (email, password, cancelToken) => axios.post("register/login", {email, password}, {cancelToken}),
    getMe: (cancelToken) => axios.get("register/getMe", {cancelToken}),
};