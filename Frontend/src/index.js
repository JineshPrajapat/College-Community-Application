
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider/AuthProvider";
import { SignUpProvider } from './AuthProvider/SignUpProvider';
import { Provider } from 'react-redux';
import {store} from '../src/Redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <SignUpProvider>
            <App />
          </SignUpProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>

);
