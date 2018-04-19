import React, { Component } from "react";
import { ProviderContext, subscribe } from "react-contextual";
import { mapSessionContextToProps } from "../context_helper";

class SetCurrentUser extends Component {
  // defining a constructor and empty state object to satisfy React compiler
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    nextProps.sessionContext.saveSession(nextProps.token, nextProps.user);
    return null;
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapContextToProps = context => {
  return mapSessionContextToProps(context);
};

export default subscribe(ProviderContext, mapContextToProps)(SetCurrentUser);
