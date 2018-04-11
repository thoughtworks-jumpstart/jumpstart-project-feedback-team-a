import React from "react";
import { saveFeedback } from "../actions/feedbackProcess";

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }
  handleSubmit(event) {
    event.preventDefault();
    saveFeedback({
      email: this.state.email
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div className="container">
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
            <textarea className="form-control" rows="5" id="feedbackItem1" />
          </div>
          <div style={{ marginTop: "20px" }} className="form-group">
            <label>What could be better?</label>
            <textarea className="form-control" rows="5" id="feedbackItem2" />
          </div>
          <div style={{ marginTop: "20px" }} className="form-group">
            <label>Suggestions for improvement?</label>
            <textarea className="form-control" rows="5" id="feedbackItem3" />
          </div>
        </form>
      </div>
    );
  }
}

export default Feedback;
