import {constants} from './constants';
import order from "../../api/projectApi/order";

export const getAllOrder = () => async (dispatch) => {
    const orderData = await order.getAll()
    dispatch({type: constants.setOrder, payload: orderData.data.result,all:orderData.data.result})
}

export const getAllOrderForAgent = (id) => async (dispatch) => {
    const orderData = await order.forAgent(id)
    dispatch({type: constants.setOrder, payload: orderData.data.result,all:orderData.data.result})
}
