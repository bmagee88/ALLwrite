import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

type RootElement = HTMLElement | null | undefined;
const root: RootElement = document.getElementById("root") as HTMLDivElement;
console.log("root", root);

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <App />
  </Router>,
  root
  // </React.StrictMode>
);
