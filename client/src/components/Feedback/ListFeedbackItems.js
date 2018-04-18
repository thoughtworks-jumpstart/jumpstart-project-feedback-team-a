import React, { Component } from "react";
import moment from "moment";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { ProviderContext, subscribe } from "react-contextual";

class ListFeedbackItem extends Component {
  render() {
    return (
      <div>
        <div className="col-lg-3">
          {moment(this.props.feedback.createdAt).format("DD MMMM YYYY")}
        </div>
        <div className="col-lg-9">
          {this.props.feedback.user} has left you feedback!
        </div>
        <div className="col-lg-3" />
        <div className="col-lg-9">
          <div className="col-lg-3">What I did well</div>
          <div className="col-lg-9">
            {this.props.feedback.feedback.feedbackGood}
          </div>
          <div className="col-lg-3">What could be better</div>
          <div className="col-lg-9">
            {this.props.feedback.feedback.feedbackImprove}
          </div>
          <div className="col-lg-3">Suggestions for Improvement</div>
          <div className="col-lg-9">
            {this.props.feedback.feedback.feedbackAction}
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

export default subscribe(ProviderContext, mapContextToProps)(ListFeedbackItem);
