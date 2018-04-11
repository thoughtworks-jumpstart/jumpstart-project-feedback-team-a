import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import "whatwg-fetch";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
// import "./index.css";
import "./components/Footer.css";
import "./components/Header.css";
import "./components/Home.css";
import "./components/Account/Login.css";

ReactDOM.render(<App />, document.getElementById("app"));

registerServiceWorker();
