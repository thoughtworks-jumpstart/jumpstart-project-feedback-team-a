export function saveFeedback({
  email,
  feedbackGood,
  feedbackImprove,
  feedbackAction,
  messageContext
}) {
  messageContext.clearMessages();
  return fetch("/api/feedbacks/save", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      feedback: {
        receiverEmail: email,
        feedbackGood: feedbackGood,
        feedbackImprove: feedbackImprove,
        feedbackAction: feedbackAction
      }
    })
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => {
        //console.log(json);
        messageContext.setSuccessMessages([json]);
      });
    } else {
      return response.json().then(json => {
        const messages = Array.isArray(json) ? json : [json];
        //console.log(json);
        messageContext.setErrorMessages(messages);
      });
    }
  });
}
