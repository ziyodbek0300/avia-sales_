import {combineReducers} from 'redux';
import user from "./user"
import flights from "./flights";
import orders from "./orders";

const RootReducer = combineReducers({
    user,
    flights,
    orders
});

export default RootReducer;
