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
);
