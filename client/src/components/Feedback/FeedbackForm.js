import React from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
import Messages from "../Messages/Messages";
import { Prompt } from "react-router-dom";
import * as qs from "query-string";

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      feedbackGood: "",
      feedbackAction: "",
      feedbackImprove: "",
      isDraft: false,
      isPending: true
    };
    this.totalCharCount = this.totalCharCount.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const queryString = qs.parse(this.props.location.search);

    if (
      window.confirm(
        `Please confirm if you would like to send this feedback to the following recipient: ${
          this.state.email ? this.state.email : queryString.email
        }?`
      )
    ) {
      //if id in query string exists, we run the feedbackProcess.updateFeedback
      //
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
          routerHistory: this.props.history
        });
      }
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
      <div className="container">
        <Messages messages={this.props.messageContext.messages} />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1 style={{ display: "inline" }}>Send Feedback</h1>
          <button
            style={{ display: "inline" }}
            className="btn btn-success pull-right"
            disabled={!this.state.isDraft}
          >
            Send
          </button>
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
          <hr />

          <div style={{ marginTop: "20px" }} className="form-group">
            <label>What I did well?</label>
            <textarea
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
              name="feedbackAction"
              className="form-control"
              rows="5"
              id="feedbackItem3"
              onChange={this.handleChange.bind(this)}
            />
          </div>
        </form>

        <Prompt
          when={this.state.isDraft}
          message="Your feedback hasn't been submitted. Are you sure you want to leave this page?"
        />
      </div>
    );
  }
}

export default FeedbackForm;
