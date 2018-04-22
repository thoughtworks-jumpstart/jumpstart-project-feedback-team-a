import { setMessageWithTimeout } from "./auth";
const TIMEOUTFOR = 3000;

export function saveFeedback({
  email,
  giver,
  feedbackGood,
  feedbackImprove,
  feedbackAction,
  messageContext,
  routerHistory
}) {
  messageContext.clearMessages();
  return fetch("/api/feedbacks/save", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      feedback: {
        receiverEmail: email,
        giverEmail: giver,
        feedbackGood: feedbackGood,
        feedbackImprove: feedbackImprove,
        feedbackAction: feedbackAction
      }
    })
  }).then(response => {
    if (response.ok) {
      routerHistory.push("/");
      return response.json().then(json => {
        const messages = [json];
        const identifier = "success";
        setMessageWithTimeout(messageContext, messages, TIMEOUTFOR, identifier);
      });
    } else {
      return response.json().then(json => {
        if (json.msg === undefined) {
          const messages = [{ msg: "Server error. Please try again later" }];
          const identifier = "error";
          setMessageWithTimeout(
            messageContext,
            messages,
            TIMEOUTFOR,
            identifier
          );
        } else {
          const messages = [json];
          const idenfitier = "error";
          setMessageWithTimeout(
            messageContext,
            messages,
            TIMEOUTFOR,
            idenfitier
          );
        }
      });
    }
  });
}

export function listIncomingFeedback(email) {
  return fetch(`/api/feedbacks/listIncomingFeedback/${email.email}`).then(
    response => {
      if (response.ok) {
        return response.json().then(json => json);
      } else {
        return response.status();
      }
    }
  );
}

export function sendRequestFeedbackEmail(email) {
  return fetch(`/api/feedbacks/sendRequestFeedbackEmail/${email}`).then(
    response => {
      if (response.ok) {
        return response.json().then(json => json);
      } else {
        return response.status();
      }
    }
  );
}
