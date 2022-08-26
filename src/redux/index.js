import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['orders','user','flights']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
    let store = createStore(
        persistedReducer,
        composeEnhancers(
            applyMiddleware(thunk),
            process.env.NODE_ENV === 'development' && window.devToolsExtension
                ? window.devToolsExtension()
                : f => f,
        ),
    );
    let persistor = persistStore(store);
    return {store, persistor};
};
