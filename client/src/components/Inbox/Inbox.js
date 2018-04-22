import React from "react";
import FeedbackList from "../Feedback/FeedbackList";
import ErrorBoundary from "../Error/ErrorBoundary";

const Inbox = () => (
  <div>
    <ErrorBoundary>
      <FeedbackList />
    </ErrorBoundary>
  </div>
);

export default Inbox;
