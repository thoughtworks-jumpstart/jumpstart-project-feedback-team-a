import React from "react";
import moment from "moment";

const FeedbackItem = props => {
  const href = `#collapse${props.itemNumber}`;
  const id = `collapse${props.itemNumber}`;
  return (
    <React.Fragment>
      <div>
        <h4 className="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href={href}>
            Feedback #{props.itemNumber}
            <strong>From: {props.feedback.user}</strong>{" "}
            {moment(props.feedback.feedback.createdAt).format(
              "DD MMMM YYYY, h:mm a"
            )}
          </a>
        </h4>
      </div>
      <div id={id} className="panel-collapse collapse">
        <div className="panel-body">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">What I Did Well</h3>
            </div>
            <div className="panel-body">
              {props.feedback.feedback.feedbackGood}
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">What I Could Do Better</h3>
            </div>
            <div className="panel-body">
              {props.feedback.feedback.feedbackImprove}
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Suggestions for Improvement</h3>
            </div>
            <div className="panel-body">
              {props.feedback.feedback.feedbackAction}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FeedbackItem;
