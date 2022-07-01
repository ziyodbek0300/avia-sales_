import {constants} from './constants';

const initialState = {
    currentUser: {},
    loading: true,
    users: {
        admin:[],
        agent:[],
        newAgent:[]
    },
    error: {
        isHave: false,
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
        case constants.getAllUser: {
            return {
                ...state,
                users: action.payload
            }
        }
        case constants.getMe: {
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            };
        }
        default:
            return state;
    }
};

export default reducer;
