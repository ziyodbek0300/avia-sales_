import axios from ".";

export default {
  addNew: (data) => axios.post("/tour-packet-order/addNew", data),
  deleteOne: (id) => axios.delete(`/order/delete/${id}`),
};
