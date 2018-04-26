import React, { Component } from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
import FeedbackItem from "../Feedback/FeedbackItem";
import Messages from "../Messages/Messages";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { ProviderContext, subscribe } from "react-contextual";

export class FeedbackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      feedbackArray: []
    };
  }

  async componentDidMount() {
    try {
      const data = await feedbackProcess.listIncomingFeedback({
        email: JSON.parse(sessionStorage.currentLoggedInUser).email,
        messageContext: this.props.messageContext
      });

      await this.setState({ feedbackArray: data });
    } catch (err) {
      throw err;
    }
  }

  render() {
    return (
      <div>
        <Messages messages={this.props.messageContext.messages} />
        <h1>Your Feedback ({this.state.feedbackArray.length})</h1>
        <div className="row">
          <div className="col-lg-12">
            <h4 style={{ display: "inline" }}>Date Received</h4>
          </div>
        </div>
        {this.state.feedbackArray.map((feedback, i) => {
          return (
            <div className="row" key={i} style={{ display: "inline" }}>
              <FeedbackItem feedback={feedback} />
            </div>
          );
        })}
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

export default subscribe(ProviderContext, mapContextToProps)(FeedbackList);
