import React from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
import { ProviderContext, subscribe } from "react-contextual";
import Messages from "../Messages/Messages";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { withCookies } from "react-cookie";
import "../Feedback/Feedback.css";
import { Prompt } from "react-router-dom";

class RequestFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      email: "",
      savedEmail: "",
      show: true,
      isDraft: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  async handleSubmit(event) {
    event.preventDefault();

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
      //let routerHistory = this.props.history;
      if (response.ok) {
        //routerHistory.push("/");

        return response.json().then(data => {
          // const messages = [{ msg: data.msg }];
          const pendingRequestId = data.pendingRequestId;

          feedbackProcess.sendRequestFeedbackEmail(
            this.state.email,
            this.props.messageContext,
            this.props.sessionContext,
            pendingRequestId
          );
          this.setState({ savedEmail: this.state.email });
          this.setState({ email: "" });
        });
      } else {
        return response.json().then(json => {
          if (json.msg === undefined) {
            const messages = [{ msg: "Server error. Please try again later" }];

            this.props.messageContext.setErrorMessages(messages);
          } else {
            const messages = [json];

            this.props.messageContext.setErrorMessages(messages);
          }
        });
      }
    });
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
      <React.Fragment>
        <div className="request-feedback-container">
          <div className="container">
            <Messages messages={this.props.messageContext.messages} />
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-header">
                <h1 style={{ display: "inline" }}>Request for Feedback</h1>
                <button
                  style={{ display: "inline" }}
                  className="btn btn-success pull-right"
                  disabled={!this.state.isDraft}
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Send
                </button>
              </div>
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
              <br />
            </form>
          </div>

          <div
            class="modal fade"
            id="myModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 class="modal-title" id="myModalLabel">
                    myTitle
                  </h4>
                </div>
                <div class="modal-body">
                  <Messages messages={this.props.messageContext.messages} />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            <Prompt
              when={this.state.isDraft}
              message="Your feedback hasn't been submitted. Are you sure you want to leave this page?"
            />
          </div>
        </div>
      </React.Fragment>
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
