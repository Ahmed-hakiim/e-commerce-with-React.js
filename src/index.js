import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import CounterProvider from "./context/CounterProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <CounterProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CounterProvider>
  //</React.StrictMode>
);