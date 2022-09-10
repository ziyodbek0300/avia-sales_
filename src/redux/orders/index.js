import {constants} from './constants';

const initialState = {
    loading: true, order: [], error: {
        isHave: false, message: ""
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.loading: {
            return {
                ...state, loading: true
            }
        }
        case constants.setOrder: {
            state.order = action.payload
            return state
            return {
                ...state, order1: action.payload, order2: action.payload
            }
        }
        default:
            return state;
    }
};

export default reducer;
