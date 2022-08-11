import {constants} from "./constants";
import flights from "../../api/projectApi/flights";

export const getAllFlights = (callBack = () => ({})) => dispatch => {
    flights.getAll()
        .then(r => {
            dispatch({type: constants.getAll, payload: r.data.result})
            callBack()
        })
        .catch(e => {
        })

};
