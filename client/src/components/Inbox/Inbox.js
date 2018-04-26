import React, { Component } from "react";
import FeedbackList from "../Feedback/FeedbackList";
import ErrorBoundary from "../Error/ErrorBoundary";
import PendingRequestList from "../RequestFeedback/PendingRequestList";
import "./Inbox.css";

class Inbox extends Component {
  constructor() {
    super();
    let feedbackCount = 0;
    let pendingRequestCount = 0;
  }

  setFeedbackCount = count => {
    this.feedbackCount = count;
  };

  setPendingRequestCount = count => {
    this.pendingRequestCount = count;
  };

  render() {
    return (
      <div className="container">
        <ErrorBoundary>
          <div className="inbox-container">
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active">
                <a
                  href="#feedbacks"
                  aria-controls="feedbacks"
                  role="tab"
                  data-toggle="tab"
                >
                  Feedbacks <span className="badge">{this.feedbackCount}</span>
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#profile"
                  aria-controls="profile"
                  role="tab"
                  data-toggle="tab"
                >
                  Pending Requests{" "}
                  <span className="badge">{this.pendingRequestCount}</span>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="feedbacks">
                <FeedbackList setFeedbackCount={this.setFeedbackCount} />
              </div>
              <div role="tabpanel" className="tab-pane" id="profile">
                <PendingRequestList
                  setPendingRequestCount={this.setPendingRequestCount}
                />
              </div>
            </div>
          </div>
          <div />
        </ErrorBoundary>
      </div>
    );
  }
}

export default Inbox;
