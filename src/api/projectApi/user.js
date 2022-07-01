import axios from ".";

export default {
    register: (body) => axios.post("register",body),
};