import moment from "moment";

export function login({
  email,
  password,
  history,
  cookies,
  from,
  messageContext,
  sessionContext
}) {
  messageContext.clearMessages();
  return fetch("/api/users/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        email: email,
        password: password
      }
    })
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => {
        sessionContext.saveSession(json.token, json.user);
        cookies.set("token", json.token, {
          expires: moment()
            .add(1, "hour")
            .toDate()
        });
        history.replace(from);
      });
    } else {
      return response.json().then(json => {
        const messages = Array.isArray(json) ? json : [json];
        messageContext.setErrorMessages(messages);
      });
    }
  });
}

export function signup({
  name,
  email,
  password,
  confirm,
  history,
  cookies,
  messageContext,
  sessionContext
}) {
  const TIMEOUTFOR = 3000;
  messageContext.clearMessages();

  if (alertFlag(name, email, password, confirm)) {
    const messages = [{ msg: "Please fill in all fields" }];
    timeOut(messageContext, messages, TIMEOUTFOR);
  } else if (password !== confirm) {
    const messages = [
      { msg: "Your confirmed password does not match the new password" }
    ];
    timeOut(messageContext, messages, TIMEOUTFOR);
  } else {
    return fetch("/api/users/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
          password: password
        }
      })
    }).then(response => {
      return response.json().then(json => {
        if (response.ok) {
          sessionContext.saveSession(json.token, json.user);
          cookies.set("token", json.token, {
            expires: moment()
              .add(1, "hour")
              .toDate()
          });
          history.push("/");
        } else {
          const messages = Array.isArray(json) ? json : [json];
          timeOut(messageContext, messages, TIMEOUTFOR);
        }
      });
    });
  }
}

export function logout({ history, cookies, sessionContext }) {
  cookies.remove("token");
  sessionContext.clearSession();
  history.push("/");
}

export function forgotPassword({ email, messageContext }) {
  messageContext.clearMessages();
  return fetch("/api/user/forgot-password", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email: email } })
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => {
        messageContext.setSuccessMessages([json]);
      });
    } else {
      return response.json().then(json => {
        const messages = Array.isArray(json) ? json : [json];
        messageContext.setErrorMessages(messages);
      });
    }
  });
}

export function resetPassword({
  password,
  confirm,
  history,
  token,
  messageContext
}) {
  messageContext.clearMessages();
  if (password !== confirm) {
    const messages = [
      { msg: "Your confirmed password does not match the new password" }
    ];
    messageContext.setErrorMessages(messages);
  } else {
    return fetch(`/api/user/reset-password/${token}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          password: password,
          confirm: confirm
        }
      })
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          history.push("/login");
          messageContext.setSuccessMessages([json]);
        });
      } else {
        return response.json().then(json => {
          const messages = Array.isArray(json) ? json : [json];
          messageContext.setErrorMessages(messages);
        });
      }
    });
  }
}

export function updateProfile({ state, sessionContext, messageContext }) {
  messageContext.clearMessages();
  return fetch("/api/user", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionContext.token}`
    },
    body: JSON.stringify({
      user: {
        email: state.email,
        name: state.name
      }
    })
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => {
        messageContext.setSuccessMessages([json]);
      });
    } else {
      return response.json().then(json => {
        const messages = Array.isArray(json) ? json : [json];
        messageContext.setErrorMessages(messages);
      });
    }
  });
}

export function changePassword({
  password,
  confirm,
  sessionContext,
  messageContext
}) {
  messageContext.clearMessages();
  if (password !== confirm) {
    const messages = [
      { msg: "Your confirmed password does not match the new password" }
    ];
    messageContext.setErrorMessages(messages);
  } else {
    return fetch("/api/user", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionContext.token}`
      },
      body: JSON.stringify({
        user: {
          password: password,
          confirm: confirm
        }
      })
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          messageContext.setSuccessMessages([json]);
        });
      } else {
        return response.json().then(json => {
          const messages = Array.isArray(json) ? json : [json];
          messageContext.setErrorMessages(messages);
        });
      }
    });
  }
}

export function deleteAccount({
  history,
  cookies,
  messageContext,
  sessionContext
}) {
  messageContext.clearMessages();
  return fetch("/api/user", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionContext.token}`
    }
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => {
        logout({ history, cookies, sessionContext });
        messageContext.setSuccessMessages([json]);
      });
    } else {
      return response.json().then(json => {
        const messages = Array.isArray(json) ? json : [json];
        messageContext.setErrorMessages(messages);
      });
    }
  });
}

export function alertFlag(name, email, password, confirm) {
  let alertFlag = false;
  name.length === 0 && (alertFlag = true);
  email.length === 0 && (alertFlag = true);
  password.length === 0 && (alertFlag = true);
  confirm.length === 0 && (alertFlag = true);
  return alertFlag;
}
export function timeOut(messageContext, messages, TIMEOUTFOR) {
  messageContext.setErrorMessages(messages);
  setTimeout(() => messageContext.clearMessages(), TIMEOUTFOR);
}
