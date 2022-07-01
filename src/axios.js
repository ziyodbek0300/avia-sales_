import axios from "axios";

const base = axios.create({
    baseURL: 'http://26.130.72.194'
})

export default base;