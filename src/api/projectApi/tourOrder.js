import axios from ".";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addNew: (data) => axios.post("/tour-packet-order/addNew", data),
  getOne: (id) => axios.get(`/tour-packet-order/getOne/${id}`),
  getAll: () => axios.get("/tour-packet-order/getAll"),
  getAllForAgent: (id) => axios.get(`/tour-packet-order/getAll/${id}`),
  deleteOne: (id) => axios.delete(`/order/delete/${id}`),
};
