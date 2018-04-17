import React, { Component } from "react";
import { listIncomingFeedback } from "../../actions/feedbackProcess";
import Messages from "../Messages/Messages";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { ProviderContext, subscribe } from "react-contextual";
import moment from "moment";

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
  }
  render() {
    return (
      <div className="container">
        <Messages messages={this.props.messageContext.messages} />
        Date Received
        {this.state.feedbackArray.map((feedback, i) => {
          return (
            <div className="row" key={i}>
              <li className="list-unstyled">
                <div className="col-sm-4" style={{ display: "inline" }}>
                  date={moment(feedback.createdAt).format("DD/MM/YYYY")}
                </div>
                <div className="col-sm-8" style={{ display: "inline" }}>
                  name={feedback.giverEmail}
                </div>
              </li>
            </div>
          );
        })}
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
