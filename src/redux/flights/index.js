import {constants} from "./constants";

const initialState = {
    loading: true,
    flights: [],
    error: {
        message: ""
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.loading: {
            return {
                ...state,
                loading: true
            }
        }
        case constants.getAll: {
            return {
                ...state,
                flights: action.payload
            }
        }
        default:
            return state;
    }
};

export default reducer;
