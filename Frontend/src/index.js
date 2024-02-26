<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";


ReactDOM.render(
  <Provider store={store}>
    {/* <AlertProvider template={AlertTemplate} {...options}> */}
      <App />
    {/* </AlertProvider> */}
  </Provider>,
  document.getElementById("root")
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>
>>>>>>> aa4615fbd98a8c03e31ab015f5deb3e9a424b55f
);
