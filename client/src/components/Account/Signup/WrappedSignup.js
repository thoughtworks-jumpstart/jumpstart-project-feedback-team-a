import React from "react";
import Signup from "./Signup";
import * as auth from "../../../actions/auth";
import { object, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import { ProviderContext, subscribe } from "react-contextual";
import {
  mapMessageContextToProps,
  mapSessionContextToProps,
  messageContextPropType,
  sessionContextPropType
} from "../../context_helper";

export class WrappedSignup extends React.Component {
  static propTypes = {
    history: object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    ...messageContextPropType,
    ...sessionContextPropType
  };

  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", confirm: "" };
  }

  componentWillUnmount() {
    this.props.messageContext.clearMessages();
  }

  componentDidMount() {}

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    auth.signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirm: this.state.confirm,
      history: this.props.history,
      cookies: this.props.cookies,
      messageContext: this.props.messageContext,
      sessionContext: this.props.sessionContext
    });
  }

  render() {
    return (
      <Signup
        {...this.props}
        {...this.state}
        handleSignup={this.handleSignup.bind(this)}
        handleChange={this.handleChange.bind(this)}
      />
    );
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    ...mapMessageContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  withCookies(WrappedSignup)
);
