import React from "react";
import FeedbackList from "../Feedback/FeedbackList";
import ErrorBoundary from "../Error/ErrorBoundary";
import PendingRequestList from "../RequestFeedback/PendingRequestList";

const Inbox = () => (
  <div className="container">
    <ErrorBoundary>
      <FeedbackList />
      <PendingRequestList />
    </ErrorBoundary>
  </div>
);

export default Inbox;
