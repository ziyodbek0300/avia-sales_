import axios from ".";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: () => axios.get("/visa/getAll/"),
    getOne: (id) => axios.get(`/visa/getOne/${id}`),
    addNew: (data) => axios.post("/visa/addNew", data),
    deleteOne: (id) => axios.delete(`/visa/delete/${id}`),
    updateOne: (id, data) => axios.put(`/visa/update/${id}`, data)
};
