import axios from ".";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: () => axios.get("/transfer/getAll/"),
    getOne: (id) => axios.get(`/transfer/getOne/${id}`),
    addNew: (data) => axios.post("/transfer/addNew", data),
    deleteOne: (id) => axios.delete(`/transfer/delete/${id}`),
    updateOne: (id, data) => axios.put(`/transfer/update/${id}`, data)
};
