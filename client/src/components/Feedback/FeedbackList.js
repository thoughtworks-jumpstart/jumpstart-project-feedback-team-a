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
        <div />
        <Messages messages={this.props.messageContext.messages} />
        <h1>
          Feedbacks <span class="badge">{this.state.feedbackArray.length}</span>
        </h1>
        <div class="panel-group" id="accordion">
          <div class="panel panel-default">
            <div class="panel-heading">
              <div className="row" />
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
