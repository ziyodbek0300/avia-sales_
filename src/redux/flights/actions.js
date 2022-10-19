import {constants} from "./constants";
import flights from "../../api/projectApi/flights";
import regions from "../../api/projectApi/regions";
import {forEach} from "lodash";

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
        })
        all.push({
            ...e,
            ...result
        })
    })
    dispatch({type: constants.getAll, payload: all, all})
};


export const getAllFlightsForAgent = (callBack = () => ({})) => async (dispatch) => {
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
        })
        all.push({
            ...e,
            ...result
        })
    })
    dispatch({type: constants.getAll, payload: all, all})
};
