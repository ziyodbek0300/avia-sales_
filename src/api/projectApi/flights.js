import axios from ".";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: () => axios.get("/flight/getAll/"),
    getOne: (id) => axios.get(`/flight/getOne/${id}`),
    addNew: (data) => axios.post("/flight/addNew", data),
    deleteOne: (id) => axios.delete(`/flights/delete/${id}`),
    updateOne: (id, data) => axios.put(`/flights/update/${id}`, data)
};
