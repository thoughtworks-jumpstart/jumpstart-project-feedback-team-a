import React, { Component } from "react";
import { listIncomingFeedback } from "../../actions/feedbackProcess";
import Messages from "../Messages/Messages";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { ProviderContext, subscribe } from "react-contextual";

class ListIncomingFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      feedbackArray: []
    };
  }

  handleClick(event) {
    listIncomingFeedback({
      //email: this.state.email,
      email: this.props.sessionContext.user.email,

      messageContext: this.props.messageContext
    }).then(data => {
      this.setState({ feedbackArray: data });
      console.log(data);
    });
    //console.log(listIncomingFeedback);
    //this.setState({ feedbackArray: data });
  }
  render() {
    return (
      <div className="container">
        <Messages messages={this.props.messageContext.messages} />

        <h1 style={{ display: "inline" }}>Collect Feedback</h1>
        <button
          style={{ display: "inline" }}
          className="btn btn-success pull-right"
          onClick={this.handleClick.bind(this)}
        >
          Send
        </button>

        <hr />
      </div>
    );
  }
}
const mapContextToProps = context => {
  return {
    ...mapMessageContextToProps(context),
    ...mapSessionContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  ListIncomingFeedback
);
