import {constants} from './constants';
import transfers from "../../api/projectApi/transfers";

export const getAllTransfers = () => async (dispatch) => {
    const orderData = await transfers.getAll()
    dispatch({type: constants.getAll, payload: orderData.data.result})
}

export const getAllTransfersForAgent = (id) => async (dispatch) => {
    const orderData = await transfers.getAllForAgents(id)
    dispatch({type: constants.getAll, payload: orderData.data.result})
}
