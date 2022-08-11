import axios from "."

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllRegions: () => axios.get("region/getAll/"),
    addNew: (data) => axios.post("region/addNew/", data),
    deleteOne: (id) => axios.delete("region/delete/" + id)
}
