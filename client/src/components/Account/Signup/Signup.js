import React from "react";
<<<<<<< HEAD:client/src/components/Account/Signup/Signup.js
import { Link } from "react-router-dom";
import { signup } from "../../../actions/auth";
import { object, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Messages from "../../Messages/Messages";
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapMessageContextToProps,
  mapSessionContextToProps,
  messageContextPropType,
  sessionContextPropType
} from "../../context_helper";

class Signup extends React.Component {
  static propTypes = {
    history: object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    ...messageContextPropType,
    ...sessionContextPropType
  };

  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  componentWillUnmount() {
    this.props.messageContext.clearMessages();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
||||||| merged common ancestors
import { Link } from "react-router-dom";
import { signup } from "../../actions/auth";
import { object, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Messages from "../Messages";
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapMessageContextToProps,
  mapSessionContextToProps,
  messageContextPropType,
  sessionContextPropType
} from "../context_helper";

class Signup extends React.Component {
  static propTypes = {
    history: object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    ...messageContextPropType,
    ...sessionContextPropType
  };

  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  componentWillUnmount() {
    this.props.messageContext.clearMessages();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
=======
import Messages from "../Messages";
import { Link } from "react-router-dom";
>>>>>>> [Hafiz/Santosh][#25] Complete adding confirm password to Signup.js, refactored Signup.js into WrappedSignup.js for easy test:client/src/components/Account/Signup.js

//   this.props.messageContext.messages} />
// this.props.handleSignup.bind(this)}>
// this.state.name}
// this.handleChange.bind(this)}
// this.state.email}
// this.handleChange.bind(this)}
// this.state.password}
// this.handleChange.bind(this)}
// this.state.confirm}
// this.handleChange.bind(this)}

const Signup = props => (
  <div className="login-container container">
    <div className="panel">
      <div className="panel-body">
        <Messages messages={props.messageContext.messages} />
        <form onSubmit={props.handleSignup.bind(this)}>
          <legend>Create an account</legend>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              autoFocus
              className="form-control"
              value={props.name}
              onChange={props.handleChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="form-control"
              value={props.email}
              onChange={props.handleChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="form-control"
              value={props.password}
              onChange={props.handleChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              placeholder="Password"
              className="form-control"
              value={props.confirm}
              onChange={props.handleChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <small className="text-muted">
              By signing up, you agree to the{" "}
              <Link to="/">Terms of Service</Link>.
            </small>
          </div>
          <button type="submit" className="btn btn-success">
            Create an account
          </button>
        </form>
      </div>
    </div>
    <p className="text-center">
      Already have an account?{" "}
      <Link to="/login">
        <strong>Log in</strong>
      </Link>
    </p>
  </div>
);

export default Signup;
