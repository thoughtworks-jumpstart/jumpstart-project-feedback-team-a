import { setMessageWithTimeout } from "./auth";
const TIMEOUTFOR = 3000;

//updateFeedback that calls a put method

export function updateFeedback({
  id,
  email,
  giver,
  feedbackGood,
  feedbackImprove,
  feedbackAction,
  messageContext,
  routerHistory
}) {
  messageContext.clearMessages();
  return fetch("/api/feedbacks/update", {
    method: "PUT", //(if id don't exist) ? "post" : "put"
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      feedback: {
        _id: id,
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
  //if id don't exist? run fetch save : run fetch put
  return fetch("/api/feedbacks/save", {
    method: "post", //(if id don't exist) ? "post" : "put"
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

export function listPendingRequest(email) {
  console.log(email);
  // return fetch(`/api/feedbacks/listPendingRequest/${email.email}`).then(
  //   response => {
  //     if (response.ok) {
  //       return response.json().then(json => json);
  //     } else {
  //       return response.status();
  //     }
  //   }
  // );
}

export function sendRequestFeedbackEmail(
  email,
  messageContext,
  sessionContext,
  pendingRequestId
) {
  return fetch(
    `/api/feedbacks/sendRequestFeedbackEmail/${email}/${pendingRequestId}/${
      sessionContext.user.email
    }`
  ).then(response => {
    if (response.ok) {
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
      //return response.status;
    }
  });
}
