import axios from "."

export default {
    getHotels:(townId)=>axios.get("getHotels/"+townId),
    getPrice:(hotelId)=>axios.post("/getPrice/"+hotelId)
}
