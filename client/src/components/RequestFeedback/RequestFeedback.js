import React from "react";
import { Prompt } from "react-router-dom";
import * as feedbackProcess from "../../actions/feedbackProcess";
import { ProviderContext, subscribe } from "react-contextual";
import Messages from "../Messages/Messages";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { withCookies } from "react-cookie";

import { setMessageWithTimeout } from "../../actions/auth";
const TIMEOUTFOR = 3000;

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
      return fetch("/api/feedbacks/save", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback: {
            receiverEmail: this.state.email,
            giverEmail: this.props.sessionContext.user.email,
            feedbackGood: "",
            feedbackImprove: "",
            feedbackAction: "",
            isPending: true
          }
        })
      }).then(response => {
        let routerHistory = this.props.history;
        if (response.ok) {
          routerHistory.push("/");
          return response.json().then(data => {
            // const messages = [{ msg: data.msg }];
            const pendingRequestId = data.pendingRequestId;

            feedbackProcess.sendRequestFeedbackEmail(
              this.state.email,
              this.props.messageContext,
              pendingRequestId
            );
          });
        } else {
          return response.json().then(json => {
            if (json.msg === undefined) {
              const messages = [
                { msg: "Server error. Please try again later" }
              ];
              const identifier = "error";
              setMessageWithTimeout(
                this.props.messageContext,
                messages,
                TIMEOUTFOR,
                identifier
              );
            } else {
              const messages = [json];
              const idenfitier = "error";
              setMessageWithTimeout(
                this.props.messageContext,
                messages,
                TIMEOUTFOR,
                idenfitier
              );
            }
          });
        }
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
    ...mapSessionContextToProps(context),
    ...mapMessageContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  withCookies(RequestFeedback)
);
