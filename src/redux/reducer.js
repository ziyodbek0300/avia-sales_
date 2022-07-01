import {combineReducers} from 'redux';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// import user from './user';


// const persistConfigTaxi = {
//   key: 'user',
//   storage,
//   whitelist: ['position', 'email'],
// };

const RootReducer = combineReducers({
  // user: persistReducer(persistConfigTaxi, user),
  // weather: weather,
  // leads: leads,
  // invoice: invoice,
  // estimate: estimate,
  // timeSheet: timeSheet,
  // notification: notification,
});

export default RootReducer;
