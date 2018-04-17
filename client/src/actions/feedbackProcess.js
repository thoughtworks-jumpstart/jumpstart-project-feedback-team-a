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
        messageContext.setSuccessMessages([json]);
      });
    } else {
      return response.json().then(json => {
        if (json.msg === undefined) {
          const messages = [{ msg: "Server error. Please try again later" }];
          messageContext.setErrorMessages(messages);
        } else {
          const messages = [json];
          messageContext.setErrorMessages(messages);
        }
      });
    }
  });
}

export function listIncomingFeedback(email) {
  return fetch(`/api/feedbacks/listIncomingFeedback/${email.email}`).then(
    response => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        console.log(response.json);
      }
    }
  );
}
