import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { logout } from "../../actions/auth";
import { withRouter } from "react-router";
import { object, instanceOf } from "prop-types";
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapSessionContextToProps,
  sessionContextPropType
} from "../context_helper";
// import { store } from "../App";
import "./Header.css";
class Header extends React.Component {
  static propTypes = {
    history: object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    ...sessionContextPropType
  };

  handleLogout(event) {
    event.preventDefault();
    logout({
      history: this.props.history,
      cookies: this.props.cookies,
      sessionContext: this.props.sessionContext
    });
  }

  render() {
    const active = { borderBottomColor: "lightgrey" };
    const feedbackLink = (
      <NavLink
        exact
        to="/feedback"
        activeStyle={active}
        style={{ color: "white" }}
        id="feedback"
      >
        Give Feedback
      </NavLink>
    );
    const requestFeedbackLink = (
      <NavLink
        exact
        to="/requestFeedback"
        activeStyle={active}
        style={{ color: "white" }}
        id="requestFeedback"
      >
        Request Feedback
      </NavLink>
    );
    const listIncomingLink = (
      <NavLink
        exact
        to="/inbox"
        activeStyle={active}
        style={{ color: "white" }}
        id="inbox"
      >
        Inbox
      </NavLink>
    );

    const rightNav = this.props.sessionContext.token ? (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a
            href="about:blank"
            data-toggle="dropdown"
            className="navbar-avatar dropdown-toggle"
            style={{ color: "white" }}
          >
            <img
              alt="avatar"
              src={
                this.props.sessionContext.user.picture ||
                this.props.sessionContext.user.gravatar
              }
            />
            <span id="user-name">
              {" "}
              {this.props.sessionContext.user.name ||
                this.props.sessionContext.user.email ||
                this.props.sessionContext.user.id}{" "}
            </span>
            <i className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to="/account" id="my-account">
                My Account
              </Link>
            </li>
            <li className="divider" />
            <li>
              <a
                href="about:blank"
                onClick={this.handleLogout.bind(this)}
                id="log-out"
              >
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <NavLink
            to="/login"
            activeStyle={active}
            id="log-in"
            style={{ color: "white" }}
          >
            Log in
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            activeStyle={active}
            id="sign-up"
            style={{ color: "white" }}
          >
            Sign up
          </NavLink>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-default navbar-static-top header-container">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              data-toggle="collapse"
              data-target="#navbar"
              className="navbar-toggle collapsed"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <NavLink exact to="/" className="navbar-brand">
              myFeedback
            </NavLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink
                  exact
                  to="/"
                  activeStyle={active}
                  style={{ color: "white" }}
                >
                  Home
                </NavLink>
              </li>
              <li>{this.props.sessionContext.token && listIncomingLink}</li>
              <li>{this.props.sessionContext.token && feedbackLink}</li>
              <li>{this.props.sessionContext.token && requestFeedbackLink}</li>
            </ul>
            {rightNav}
          </div>
        </div>
      </nav>
    );
  }
}

const mapContextToProps = context => {
  return mapSessionContextToProps(context);
};

export default withRouter(
  subscribe(ProviderContext, mapContextToProps)(withCookies(Header))
);
