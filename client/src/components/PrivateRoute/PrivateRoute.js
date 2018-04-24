import React from "react";
import { subscribe } from "react-contextual";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = props => props.hasOwnProperty("jwtToken");

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (sessionStorage.getItem("currentLoggedInUser") === null) {
    this.isAuthenticated = false;
  } else if (sessionStorage.getItem("currentLoggedInUser").length > 2) {
    this.isAuthenticated = true;
  }
  return (
    <Route
      {...rest}
      render={props =>
        this.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default subscribe()(PrivateRoute);
