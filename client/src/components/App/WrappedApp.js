import React, { Component } from "react";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import { Provider } from "react-contextual";
import { store } from "../Store";

export class WrappedApp extends Component {
  render() {
    return (
      <CookiesProvider>
        <Provider {...store(this.props.document, this.props.sessionStorage)}>
          <App sessionStorage={this.props.sessionStorage} />
        </Provider>
      </CookiesProvider>
    );
  }
}

export default WrappedApp;
