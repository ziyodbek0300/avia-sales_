import axios from ".";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: () => axios.get("/tour/getAll/"),
  getAllForAgent: (id) => axios.get(`/tour/all/${id}`),
  getOne: (id) => axios.get(`/tour/getOne/${id}`),
  addNew: (data) => axios.post("/tour/addNew", data),
  deleteOne: (id) => axios.delete(`/tour/delete/${id}`),
  updateOne: (id, data) => axios.put(`/tour/update/${id}`, data),
};
