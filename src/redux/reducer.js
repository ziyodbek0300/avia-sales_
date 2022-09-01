import {combineReducers} from 'redux';
import user from "./user"
import flights from "./flights";
import orders from "./orders";
import transfers from "./transfers";
import visas from "./visas";

const RootReducer = combineReducers({
    user,
    flights,
    transfers,
    visas,
    orders
});

export default RootReducer;
