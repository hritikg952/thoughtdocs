import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Routes from "./route config/Routes";
import { Provider } from "react-redux";
import store from "./store";
import "draft-js/dist/Draft.css";

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
