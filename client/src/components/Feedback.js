import React from "react";
import { saveFeedback } from "../actions/feedbackProcess";
import Messages from "../components/Messages";
import { mapMessageContextToProps } from "./context_helper";
import { ProviderContext, subscribe } from "react-contextual";

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }
  handleSubmit(event) {
    event.preventDefault();
    saveFeedback({
      email: this.state.email,
      feedbackGood: this.state.feedbackGood,
      feedbackImprove: this.state.feedbackImprove,
      feedbackAction: this.state.feedbackAction,
      messageContext: this.props.messageContext
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div className="container">
        <Messages messages={this.props.messageContext.messages} />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1 style={{ display: "inline" }}>Collect Feedback</h1>
          <button
            style={{ display: "inline" }}
            className="btn btn-success pull-right"
          >
            Send
          </button>
          <div style={{ marginTop: "20px" }} className="form-group">
            <label>Add Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="emailAddress"
              placeholder="Email"
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <hr />

          <h4>Feedback for Roy</h4>

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
      </div>
    );
  }
}

//export default Feedback;

const mapContextToProps = context => {
  return {
    ...mapMessageContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(Feedback);
