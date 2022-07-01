import {constants} from './constants';
import user from "../../api/projectApi/user";
import axios from "axios";
import Cookies from "js-cookie"
import {toast} from "react-toastify";

const CancelToken = axios.CancelToken;
let source = CancelToken.source();
export const LoadingUser = () => dispatch => {
    dispatch({type: constants.loading})
}

export const logOut = () => dispatch => {
    dispatch({
        type: constants.getMe,
        payload: {},
    });
}
export const getMe = () => dispatch => {
    source?.cancel()
    source = CancelToken.source();
    dispatch({type: constants.loading})
    user.getMe(source.token)
        .then(r => {
            dispatch({
                type: constants.getMe,
                payload: r.data.result,
            });
        })
        .catch(e => {
            dispatch({
                type: constants.getMe,
                payload: {},
            });
        })

};

let sourceLogin = CancelToken.source();
export const loginUser = (email, password, callBack = () => {
}) => dispatch => {
    sourceLogin?.cancel()
    sourceLogin = CancelToken.source();
    user.login(email, password, sourceLogin.token)
        .then(r => {
            Cookies.set("token", r.data.result.token)
            callBack()
            dispatch(getMe())
        })
        .catch(e => {
            toast(<div>asdsa</div>,{type:"warning",autoClose:500})
            dispatch({
                type: constants.getMe,
                payload: {},
            });
        })

};
