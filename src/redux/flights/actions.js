import {constants} from "./constants";
import flights from "../../api/projectApi/flights";
import regions from "../../api/projectApi/regions";

export const getAllFlights = (callBack = () => ({})) => dispatch => {
    flights.getAll()
        .then(r => {
            let arr = [];
            let all = [];
            regions.getAllRegions().then(region => {
                console.log("region", region)
                r.data.result.forEach(flight => {
                    console.log("flight", region)
                    region.data.result[0].forEach(reg => {
                        if (flight.fromId === reg.id) {
                            arr.push({...flight, fromName: reg.name});
                        }
                    })
                })
                arr.forEach(flight => {
                    region.data.result[0].forEach(reg => {
                        if (flight.toId === reg.id) {
                            all.push({...flight, toName: reg.name});
                        }
                    })
                })
            })
            dispatch({type: constants.getAll, payload: all})
            callBack()
        })
        .catch(e => {
        });
};
