import React from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
import Messages from "../Messages/Messages";
import { Prompt } from "react-router-dom";
import * as qs from "query-string";
import "./Feedback.css";

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: qs.parse(this.props.location.search).email,
      feedbackGood: "",
      feedbackAction: "",
      feedbackImprove: "",
      savedEmail: "",
      savedFeedbackGood: "",
      savedFeedbackAction: "",
      savedFeedbackImprove: "",
      isDraft: false,
      isPending: true
    };
    this.totalCharCount = this.totalCharCount.bind(this);
    this.props.messageContext.clearMessages();
  }

  handleSubmit(event) {
    event.preventDefault();
    const queryString = qs.parse(this.props.location.search);

    if (this.props.location.search === "") {
      this.setState({ isDraft: false });
      feedbackProcess.saveFeedback({
        email: this.state.email,
        giver: this.props.sessionContext.user.email,
        feedbackGood: this.state.feedbackGood,
        feedbackImprove: this.state.feedbackImprove,
        feedbackAction: this.state.feedbackAction,
        messageContext: this.props.messageContext,
        routerHistory: this.props.history,
        isPending: false
      });

      this.setState({ savedFeedbackGood: this.state.feedbackGood });
      this.setState({ feedbackGood: "" });
      this.setState({ savedFeedbackImprove: this.state.feedbackImprove });
      this.setState({ feedbackImprove: "" });
      this.setState({ savedFeedbackAction: this.state.feedbackAction });
      this.setState({ feedbackAction: "" });
      this.setState({ email: "" });
    } else {
      this.setState({ isDraft: false });
      feedbackProcess.updateFeedback({
        id: qs.parse(this.props.location.search).id,
        email: queryString.email,
        giver: this.props.sessionContext.user.email,
        feedbackGood: this.state.feedbackGood,
        feedbackImprove: this.state.feedbackImprove,
        feedbackAction: this.state.feedbackAction,
        messageContext: this.props.messageContext,
        routerHistory: this.props.history,
        isPending: false
      });
    }
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    });
    await this.setState({
      isDraft: this.totalCharCount() > 0 && this.state.email.length >= 0
    });
  }

  totalCharCount() {
    let totalCharCount =
      this.state.feedbackAction.length +
      this.state.feedbackGood.length +
      this.state.feedbackImprove.length;
    return totalCharCount;
  }

  render() {
    return (
      <React.Fragment>
        <div className="feedback-container">
          <div className="container">
            <div className="form-header">
              <Messages messages={this.props.messageContext.messages} />

              <h1 style={{ display: "inline" }}>Send Feedback</h1>
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
              <label>Add Email address</label>
              <input
                type="email"
                name="email"
                value={qs.parse(this.props.location.search).email}
                className="form-control"
                id="emailAddress"
                placeholder="Email"
                disabled={
                  qs.parse(this.props.location.search).email ? true : false
                }
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div style={{ marginTop: "20px" }} className="form-group">
              <label>What I did well?</label>
              <textarea
                value={this.state.feedbackGood}
                name="feedbackGood"
                className="form-control"
                rows="5"
                id="feedbackItem1"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div style={{ marginTop: "20px" }} className="form-group">
              <label>What could be better?</label>
              <textarea
                value={this.state.feedbackImprove}
                name="feedbackImprove"
                className="form-control"
                rows="5"
                id="feedbackItem2"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div style={{ marginTop: "20px" }} className="form-group">
              <label>Suggestions for improvement?</label>
              <textarea
                value={this.state.feedbackAction}
                name="feedbackAction"
                className="form-control"
                rows="5"
                id="feedbackItem3"
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>
          <br />
        </div>
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Info
                </h4>
              </div>
              <div className="modal-body">
                Are you sure you want to send a feedback to {this.state.email}?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  onClick={() => this.props.messageContext.clearMessages()}
                >
                  No
                </button>
              </div>
            </div>
          </div>
          <Prompt
            when={this.state.isDraft}
            message="Your feedback hasn't been submitted. Are you sure you want to leave this page?"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default FeedbackForm;
