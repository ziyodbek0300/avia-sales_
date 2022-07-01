import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import Store from './redux';
import {initializeApp} from "firebase/app";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {CookiesProvider} from 'react-cookie';
import "./lang"

const {store, persistor} = Store();

const firebaseConfig = {
    apiKey: "AIzaSyCh8iVwHAk4edTRMCTfsixFgQGgbxiQ__o",
    authDomain: "travelcontinent-6deec.firebaseapp.com",
    projectId: "travelcontinent-6deec",
    storageBucket: "travelcontinent-6deec.appspot.com",
    messagingSenderId: "267962106998",
    appId: "1:267962106998:web:0326271bfbdab5676e8b57"
};

export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>
)