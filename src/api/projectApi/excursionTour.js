import axios from ".";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: () => axios.get("/excursionTour/getAll/"),
    getOne: (id) => axios.get(`/excursionTour/getOne/${id}`),
    addNew: (data) => axios.post("/excursionTour/addNew", data),
    deleteOne: (id) => axios.delete(`/excursionTour/delete/${id}`),
    updateOne: (id, data) => axios.put(`/excursionTour/update/${id}`, data)
};
