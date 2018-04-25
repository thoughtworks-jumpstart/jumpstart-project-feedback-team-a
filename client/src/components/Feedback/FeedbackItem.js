import React from "react";
import moment from "moment";

const FeedbackItem = props => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-3" id="feedback-date">
          {moment(props.feedback.feedback.createdAt).format(
            "DD MMMM YYYY, h:mm a"
          )}
        </div>
        <div className="col-lg-9" id="feedback-giver">
          <strong>{props.feedback.user} has left you feedback!</strong>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3" />
        <div className="col-lg-3">What I did well</div>
        <div className="col-lg-6" id="feedback-good">
          {props.feedback.feedback.feedbackGood}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3" />
        <div className="col-lg-3">What could be better</div>
        <div className="col-lg-6" id="feedback-improve">
          {props.feedback.feedback.feedbackImprove}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3" />
        <div className="col-lg-3">Suggestions for Improvement</div>
        <div className="col-lg-6" id="feedback-action">
          {" "}
          {props.feedback.feedback.feedbackAction}
        </div>
      </div>
    </React.Fragment>
  );
};
export default FeedbackItem;
