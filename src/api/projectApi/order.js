import axios from ".";

export default {
    getAll: () => axios.get("/order/getAll"),
    forAgent: (id) => axios.get(`/order/all/${id}`),
    getOne: (id) => axios.get(`/order/getOne/${id}`),
    addNew: (data) => axios.post("/order/addNew", data),
    deleteOne: (id) => axios.delete(`/order/delete/${id}`),
    attach: (data) => axios.post(`/register/attach`, data),
    updateOne: (id, data) => axios.put(`/order/update/${id}`, data)
};
