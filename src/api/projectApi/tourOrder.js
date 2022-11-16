import axios from ".";

export default {
  addNew: (data) => axios.post("/tour-packet-order/addNew", data),
  getOne: (id) => axios.get(`/tour-packet-order/getOne/${id}`),
  getAll: () => axios.post("/tour-packet-order/getAll"),
  deleteOne: (id) => axios.delete(`/order/delete/${id}`),
};
