import React from "react";
import moment from "moment";

const FeedbackItem = props => {
  const href = `#collapse${props.itemNumber}`;
  const id = `collapse${props.itemNumber}`;
  return (
    <React.Fragment>
      <div>
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href={href}>
            Feedback #{props.itemNumber}
            <strong>From: {props.feedback.user}</strong>{" "}
            {moment(props.feedback.feedback.createdAt).format(
              "DD MMMM YYYY, h:mm a"
            )}
          </a>
        </h4>
      </div>
      <div id={id} class="panel-collapse collapse">
        <div class="panel-body">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">What I Did Well</h3>
            </div>
            <div class="panel-body">{props.feedback.feedback.feedbackGood}</div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">What I Could Do Better</h3>
            </div>
            <div class="panel-body">
              {props.feedback.feedback.feedbackImprove}
            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Suggestions for Improvement</h3>
            </div>
            <div class="panel-body">
              {props.feedback.feedback.feedbackAction}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FeedbackItem;
