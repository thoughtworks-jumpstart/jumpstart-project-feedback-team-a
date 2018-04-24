import React from "react";
import { subscribe } from "react-contextual";
import { Route, Redirect } from "react-router-dom";

let isAuthenticated = props => props.hasOwnProperty("jwtToken");

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (rest.sessionStorage.getItem("currentLoggedInUser") === null) {
    isAuthenticated = false;
  } else if (rest.sessionStorage.getItem("currentLoggedInUser").length > 2) {
    isAuthenticated = true;
  }
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
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
