import axios from ".";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: () => axios.get("/order/getAll/"),
    getOne: (id) => axios.get(`/order/getOne/${id}`),
    addNew: (data) => axios.post("/order/addNew", data),
    deleteOne: (id) => axios.delete(`/order/delete/${id}`),
    updateOne: (id, data) => axios.put(`/order/update/${id}`, data)
};
