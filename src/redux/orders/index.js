import {constants} from './constants';

const initialState = {
    loading: true, order: null, error: {
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
            return {
                ...state, order: action.payload
            }
        }
        default:
            return state;
    }
};

export default reducer;
