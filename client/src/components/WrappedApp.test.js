import React from "react";
import ReactDOM from "react-dom";
import WrappedApp from "./WrappedApp";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WrappedApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
