import {combineReducers} from 'redux';
import user from "./user"
import flights from "./flights";

const RootReducer = combineReducers({
    user,
    flights
});

export default RootReducer;
