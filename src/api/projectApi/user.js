import axios from ".";

export default {
    get: (body) => axios.post("/", body),
    register: (body) => axios.post("register", body),
    add: (body) => axios.post("/user/add", body),
    login: (email, password, cancelToken) => axios.post("register/login", {email, password}, {cancelToken}),
    getMe: (cancelToken) => axios.get("user/getMe", {cancelToken}),
    getAll: (cancelToken) => axios.get("user/getAll", {cancelToken}),
    acceptUser: (id, cancelToken) => axios.post(`user/acceptAgent/${id}`, {}, {cancelToken}),
    deleteUser: (id, cancelToken) => axios.put(`user/deleteUser/${id}`, {}, {cancelToken}),
    updateUser: (id, data, cancelToken) => axios.put(`user/update/${id}`, data, {cancelToken}),
};
