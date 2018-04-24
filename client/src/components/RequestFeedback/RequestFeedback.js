import React from "react";
import { Prompt } from "react-router-dom";
import * as feedbackProcess from "../../actions/feedbackProcess";
import { mapMessageContextToProps } from "../context_helper";
import { ProviderContext, subscribe } from "react-contextual";
import Messages from "../Messages/Messages";

// import Messages from "../Messages/Messages";

class RequestFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isDraft: false
    };
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (
      window.confirm(
        `Please confirm if you would like to send this feedback to the following recipient: ${
          this.state.email
        }?`
      )
    ) {
      await this.setState({ isDraft: !this.state.isDraft });
      feedbackProcess.sendRequestFeedbackEmail({
        email: this.state.email,
        messageContext: this.props.messageContext
      });
    }
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    });
    await this.setState({
      isDraft: this.state.email.length > 0
    });
  }

  render() {
    return (
      <div className="container">
        <Messages messages={this.props.messageContext.messages} />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1 style={{ display: "inline" }}>Request for Feedback</h1>
          <button
            style={{ display: "inline" }}
            className="btn btn-success pull-right"
            disabled={!this.state.isDraft}
          >
            Send
          </button>
          <div style={{ marginTop: "20px" }} className="form-group">
            <label>Add Registered User Email address</label>
            <input
              style={{ display: "inline" }}
              type="email"
              name="email"
              className="form-control"
              id="emailAddress"
              placeholder="Email"
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <hr />
          <Prompt when={this.state.isDraft} message="Leaving?" />
        </form>
      </div>
    );
  }
}

const mapContextToProps = context => {
  return {
    ...mapMessageContextToProps(context)
  };
};
export default subscribe(ProviderContext, mapContextToProps)(RequestFeedback);
