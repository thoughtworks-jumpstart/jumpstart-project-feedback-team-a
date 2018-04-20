import React from "react";

class RequestFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isDraft: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      window.confirm(
        `Please confirm if you would like to send this request to the following recipient: ${
          this.state.email
        }?`
      )
    ) {
      this.setState({ isDraft: false });
      window.confirm(`Sent!`);
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
        </form>
      </div>
    );
  }
}

export default RequestFeedback;
