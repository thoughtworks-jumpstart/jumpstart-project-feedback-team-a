import React from "react";
import ReactDOM from "react-dom";
import WrappedApp from "./components/WrappedApp";
import registerServiceWorker from "./registerServiceWorker";

import "whatwg-fetch";
import "./Common.css";

ReactDOM.render(<WrappedApp />, document.getElementById("app"));

registerServiceWorker();
