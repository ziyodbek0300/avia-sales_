import axios from "."

export default {
    getHotels:(townId)=>axios.post("getHotels/"+townId)
}