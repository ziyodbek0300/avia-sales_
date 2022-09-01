import {constants} from './constants';
import visa from "../../api/projectApi/visas";

export const getAllVisas = () => async (dispatch) => {
    const orderData = await visa.getAll()
    dispatch({type: constants.getAll, payload: orderData.data.result})
}
