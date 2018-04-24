import React from "react";
import FeedbackList from "../Feedback/FeedbackList";
import ErrorBoundary from "../Error/ErrorBoundary";

const Inbox = () => (
  <div className="container">
    <ErrorBoundary>
      <FeedbackList />
    </ErrorBoundary>
  </div>
);

export default Inbox;
