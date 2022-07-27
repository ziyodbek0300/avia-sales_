import {combineReducers} from 'redux';
import user from "./user"

const RootReducer = combineReducers({
    user,
});

export default RootReducer;
