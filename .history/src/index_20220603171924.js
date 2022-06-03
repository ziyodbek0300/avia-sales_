import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCh8iVwHAk4edTRMCTfsixFgQGgbxiQ__o",
  authDomain: "travelcontinent-6deec.firebaseapp.com",
  projectId: "travelcontinent-6deec",
  storageBucket: "travelcontinent-6deec.appspot.com",
  messagingSenderId: "267962106998",
  appId: "1:267962106998:web:0326271bfbdab5676e8b57"
};

const app = initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)