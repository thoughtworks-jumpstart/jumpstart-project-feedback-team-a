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

const isAuthenticated = props => props.jwtToken !== null;

const PrivateRoute = subscribe()(({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated(props) ? (
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
));

export class App extends React.Component {
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
            <Route path="/feedback" component={WrappedFeedback} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={WrappedSignup} />
            <PrivateRoute path="/account" component={Profile} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/reset/:token" component={Reset} />
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
