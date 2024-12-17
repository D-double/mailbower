import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import App from "./App.jsx";
// import "./assets/css/bootstrap.css";
import "./assets/css/main.css";
import "./assets/css/style.css";
// import "./assets/css/vue-multiselect.min.css";

ReactDOM.createRoot(document.getElementById("root-select")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
export {App};

window.initReactApp = function () {
  ReactDOM.createRoot(document.getElementById("root-select")).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};
