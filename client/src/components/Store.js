export const store = (document, sessionStorage) => {
  return {
    initialState: {
      jwtToken: document.cookie.split("=")[1] || "",
      user: JSON.parse(sessionStorage.getItem("currentLoggedInUser")) || {},
      messages: {}
    },
    actions: {
      saveSession: (jwtToken, user) => {
        return { jwtToken, user };
      },
      clearSession: () => ({ jwtToken: null, user: {} }),
      clearMessages: () => ({ messages: {} }),
      setErrorMessages: errors => ({ messages: { error: errors } }),
      setSuccessMessages: success => ({ messages: { success: success } })
    }
  };
};
