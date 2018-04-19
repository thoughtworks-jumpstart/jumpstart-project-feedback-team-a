import React, { Component } from "react";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import { Provider } from "react-contextual";

export const store = {
  initialState: {
    jwtToken: document.cookie.split("token")[1].split("=")[1],
    user: JSON.parse(sessionStorage.getItem("currentLoggedInUser")) || {},
    messages: {}
  },
  actions: {
    saveSession: (jwtToken, user) => {
      return { jwtToken, user };
    },
    clearSession: () => ({ jwtToken: null, user: {} }),
    clearMessages: () => ({ messages: {} }),
    setErrorMessages: errors => ({ messages: { error: errors } }),
    setSuccessMessages: success => ({ messages: { success: success } })
  }
};

class WrappedApp extends Component {
  render() {
    return (
      <CookiesProvider>
        <Provider {...store}>
          <App />
        </Provider>
      </CookiesProvider>
    );
  }
}

export default WrappedApp;
