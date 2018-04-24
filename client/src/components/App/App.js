import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import Login from "../Account/Login/Login";
import WrappedSignup from "../Account/Signup/WrappedSignup";
import Profile from "../Account/Profile/Profile";
import Forgot from "../Account/Forgot/Forgot";
import Reset from "../Account/Reset/Reset";
import WrappedFeedback from "../Feedback/WrappedFeedback";
import * as actions from "../../actions/auth";

import Inbox from "../Inbox/Inbox";

import { withCookies } from "react-cookie";
import { ProviderContext, subscribe } from "react-contextual";
import { mapSessionContextToProps } from "../context_helper";
import RequestFeedback from "../RequestFeedback/RequestFeedback";

import PrivateRoute from "../PrivateRoute/PrivateRoute";

export class App extends React.Component {
  isAuthenticated = false;

  async componentDidMount() {
    const currentUser = await actions.getCurrentUser(
      this.props.cookies.get("token")
    );
    this.props.sessionContext.saveSession(
      this.props.sessionContext.token,
      currentUser
    );
    sessionStorage.setItem("currentLoggedInUser", JSON.stringify(currentUser));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute
              path="/requestFeedback"
              exact
              component={RequestFeedback}
            />
            <PrivateRoute path="/feedback" component={WrappedFeedback} />
            <PrivateRoute path="/inbox" component={Inbox} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={WrappedSignup} />
            <PrivateRoute path="/account" component={Profile} />
            <PrivateRoute path="/forgot" component={Forgot} />
            <PrivateRoute path="/reset/:token" component={Reset} />
            <Route path="*" component={NotFound} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapContextToProps = context => {
  return mapSessionContextToProps(context);
};

export default subscribe(ProviderContext, mapContextToProps)(withCookies(App));
