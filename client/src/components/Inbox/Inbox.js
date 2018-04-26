import React from "react";
import FeedbackList from "../Feedback/FeedbackList";
import ErrorBoundary from "../Error/ErrorBoundary";
import PendingRequestList from "../RequestFeedback/PendingRequestList";
import "./Inbox.css";

const Inbox = () => (
  <div className="container">
    <ErrorBoundary>
      <div className="inbox-container">
        <FeedbackList />
        <PendingRequestList />
      </div>
    </ErrorBoundary>
  </div>
);

export default Inbox;
