import React from "react";
import { object } from "prop-types";
import "./Messages.css";
class Messages extends React.Component {
  static propTypes = {
    messages: object.isRequired
  };

  render() {
    return this.props.messages.success ? (
      <div role="alert" className="alert alert-success">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {this.props.messages.success.map((message, index) => (
          <div key={index}>{message.msg}</div>
        ))}
      </div>
    ) : this.props.messages.error ? (
      <div role="alert" className="alert alert-danger .alert-dismissible">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {this.props.messages.error.map((message, index) => (
          <div key={index}>{message.msg}</div>
        ))}
      </div>
    ) : this.props.messages.info ? (
      <div role="alert" className="alert alert-info">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {this.props.messages.info.map((message, index) => (
          <div key={index}>{message.msg}</div>
        ))}
      </div>
    ) : null;
  }
}

export default Messages;
