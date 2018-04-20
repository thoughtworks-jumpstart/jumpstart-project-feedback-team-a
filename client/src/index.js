import React from "react";
import ReactDOM from "react-dom";
import WrappedApp from "./components/App/WrappedApp";
import registerServiceWorker from "./registerServiceWorker";
import "whatwg-fetch";
import "./Common.css";

ReactDOM.render(
  <WrappedApp document={document} sessionStorage={sessionStorage} />,
  document.getElementById("app")
);

registerServiceWorker();
