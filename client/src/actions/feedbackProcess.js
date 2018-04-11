export function saveFeedback({ email }) {
  return fetch("/api/feedbacks/save", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        email: email
      }
    })
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => {
        //const messages = Array.isArray(json) ? json : [json];
        console.log("Save success!");
        //messageContext.setSuccessMessages(messages);
      });
    } else {
      return response.json().then(json => {
        //const messages = Array.isArray(json) ? json : [json];
        console.log("Save Error!");
        //messageContext.setErrorMessages(messages);
      });
    }
  });
}
