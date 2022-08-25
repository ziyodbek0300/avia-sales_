import {constants} from "./constants";
import flights from "../../api/projectApi/flights";
import regions from "../../api/projectApi/regions";
import {forEach} from "lodash";

<<<<<<< HEAD
export const getAllFlights = (callBack = () => ({})) => dispatch => {
    flights.getAll()
        .then(r => {
            let arr = [];
            let all = [];
            regions.getAllRegions().then(region => {
                r.data.result.forEach(flight => {
                    region.data.result.forEach(reg => {
                        if (flight.fromId === reg.id) {
                            arr.push({...flight, fromName: reg.name});
                        }
                    })
                })
            console.log(arr)
                arr.forEach(flight => {
                    region.data.result.forEach(reg => {
                        if (flight.toId === reg.id) {
                            all.push({...flight, toName: reg.name});
                        }
                    })
                })
            })
            dispatch({type: constants.getAll, payload: all})
            callBack()
=======
export const getAllFlights = (callBack = () => ({})) => async (dispatch) => {
    let all = [];
    const res = await flights.getAll()
    const region = await regions.getAllRegions()
    forEach(res.data.result, e => {
        let result = {
            fromName: "",
            toName: ""
        }
        forEach(region.data.result, r => {
            if (r.id === e.fromId) {
                result.fromName = r.name
            } else if (r.id === e.toId) {
                result.toName = r.name
            }
>>>>>>> 9d74f8fa1ea163979bee86ee69dff9134d11770c
        })
        all.push({
            ...e,
            ...result
        })
    })
    dispatch({type: constants.getAll, payload: all, all})
};
