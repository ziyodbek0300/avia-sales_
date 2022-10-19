import axios from ".";

export default {
  addNew: (data) => axios.post("/tour-packet-order/addNew", data),
  getAll: () => axios.post("/tour-packet-order/getAll"),
  deleteOne: (id) => axios.delete(`/order/delete/${id}`),
};
