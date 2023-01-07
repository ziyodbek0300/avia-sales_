import axios from "."

export default {
    getHotels: (townId) => axios.get("/hotel/getOne/" + townId),
    getPrice: (hotelId) => axios.post("/getPrice/" + hotelId),
    hotelOrder: (hotelData) => axios.post("/hotel-order/addNew", hotelData),
    getOne: (hotelData) => axios.get("/hotel-order/getOne/" + hotelData),
    getAll: () => axios.get("/hotel-order/getAll/"),
    getAllForAgent: (id) => axios.get(`/hotel-order/getAll/${id}`),
}
