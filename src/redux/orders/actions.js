import {constants} from './constants';
// import user from "../../api/projectApi/user";
// import {toast} from "react-toastify";
import order from "../../api/projectApi/order";

export const getAllOrder = () => async (dispatch) => {
    try {
        const orderData = await order.getAll()
        dispatch({type:constants.getOrder,payload:orderData.data.result})
    } catch (e) {
    }
}
