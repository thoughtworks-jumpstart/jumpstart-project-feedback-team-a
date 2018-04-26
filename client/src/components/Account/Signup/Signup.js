import React from "react";
import Messages from "../../Messages/Messages";
import { Link } from "react-router-dom";

import "./Signup.css";

const Signup = props => (
  <div className="signup-container">
    <div className="panel" id="login-panel">
      <div className="panel-body">
        <Messages messages={props.messageContext.messages} />
        <form onSubmit={props.handleSignup}>
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
              onChange={props.handleChange}
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
              onChange={props.handleChange}
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
              onChange={props.handleChange}
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
              onChange={props.handleChange}
            />
          </div>
          <div className="form-group">
            <small className="text-muted">
              By signing up, you agree to the{" "}
              <Link to="/">Terms of Service</Link>.
            </small>
          </div>
          <button type="submit" className="btn btn-success">
            Sign Up
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
