import axios from "."

export default {
    getHotels:(townId)=>axios.get("/hotel/getOne/"+townId),
    getPrice:(hotelId)=>axios.post("/getPrice/"+hotelId),
    hotelOrder:(hotelData)=>axios.post("/hotel/hotel-order")
}
