import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState = { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center">
          Oh no! Something went wrong{" "}
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
