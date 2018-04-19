import React from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
// import Messages from "../Messages/Messages";

class RequestFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isDraft: false
    };
  }

  handleSubmit(event) {
    this.setState({ isDraft: false });
    event.preventDefault();
    feedbackProcess.saveFeedback({
      email: this.state.email,
      giver: this.props.sessionContext.user.email,
      messageContext: this.props.messageContext,
      routerHistory: this.props.history
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
      <div className="container">
        {/* <Messages messages={this.props.messageContext.messages} /> */}
        <form>
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
        </form>
      </div>
    );
  }
}

export default RequestFeedback;
