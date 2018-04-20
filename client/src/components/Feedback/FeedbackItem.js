import React, { Component } from "react";
import moment from "moment";

class FeedbackItem extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-3" id="feedback-date">
            {moment(this.props.feedback.feedback.createdAt).format(
              "DD MMMM YYYY, h:mm a"
            )}
          </div>
          <div className="col-lg-9" id="feedback-giver">
            <strong>{this.props.feedback.user} has left you feedback!</strong>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-3" id="feedback-well">
            What I did well
          </div>
          <div className="col-lg-6">
            {this.props.feedback.feedback.feedbackGood}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-3" id="feedback-better">
            What could be better
          </div>
          <div className="col-lg-6">
            {this.props.feedback.feedback.feedbackImprove}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-lg-3" id="feedback-improve">
            Suggestions for Improvement
          </div>
          <div className="col-lg-6">
            {this.props.feedback.feedback.feedbackAction}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default FeedbackItem;
