import React, { Component } from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
import FeedbackItem from "../Feedback/FeedbackItem";
import Messages from "../Messages/Messages";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { ProviderContext, subscribe } from "react-contextual";
import "./Feedback.css";

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
        {this.props.setFeedbackCount(this.state.feedbackArray.length)}
        <div className="panel-group" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.state.feedbackArray.map((feedback, i) => {
                return (
                  <div className="row" key={i} style={{ display: "inline" }}>
                    <FeedbackItem feedback={feedback} itemNumber={i + 1} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
