import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "bulma/css/bulma.css";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL =
  "https://consolerentapideploytest-production.up.railway.app";
axios.defaults.withCredentials = true;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
