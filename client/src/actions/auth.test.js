import { login } from "./auth";
import { signup } from "./auth";
import fetchMock from "fetch-mock";

let mockSaveSession;
let mockSetCookies;
let mockHistoryReplace;
let mockSetErrorMessages;
let dummyUser;
let functionParameters;
let mockHistoryPush;

describe("Auth", () => {
  beforeEach(() => {
    mockSaveSession = jest.fn();
    mockSetCookies = jest.fn();
    mockHistoryReplace = jest.fn();
    mockSetErrorMessages = jest.fn();
    mockHistoryPush = jest.fn();
    dummyUser = {};
    functionParameters = {
      messageContext: {
        clearMessages: () => {},
        setErrorMessages: mockSetErrorMessages
      },
      sessionContext: { saveSession: mockSaveSession },
      cookies: { set: mockSetCookies },
      history: { replace: mockHistoryReplace, push: mockHistoryPush },
      from: ""
    };
  });

  it("should login successfully", async () => {
    const response = {
      status: 200,
      body: { token: "some token", user: dummyUser }
    };
    await fetchMock.mock("/api/users/login", response);

    await login(functionParameters);

    expect(mockSaveSession).toHaveBeenCalledTimes(1);
    expect(mockSaveSession).toHaveBeenCalledWith("some token", dummyUser);
    expect(mockSetCookies).toHaveBeenCalledTimes(1);
    expect(mockHistoryReplace).toHaveBeenCalledTimes(1);
    expect(mockHistoryReplace).toHaveBeenCalledWith(functionParameters.from);
  });

  it("should set error messages on login when http response is non 200", async () => {
    const RESPONSE_BODY = {};
    const response = {
      status: 400,
      body: RESPONSE_BODY
    };
    await fetchMock.mock("/api/users/login", response, {
      overwriteRoutes: true
    });

    await login(functionParameters);

    expect(mockSetErrorMessages).toHaveBeenCalledTimes(1);
    expect(mockSetErrorMessages).toHaveBeenCalledWith([RESPONSE_BODY]);
  });

  it("should signup successfully", async () => {
    const response = {
      status: 200,
      body: { token: "some token", user: dummyUser }
    };
    const name = "abc";
    const email = "abc@abc.com";
    const password = "1";
    const confirm = "1";

    await fetchMock.mock("/api/users/signup", response);

    await signup({
      name,
      email,
      password,
      confirm,
      ...functionParameters
    });

    expect(mockSaveSession).toHaveBeenCalledTimes(1);
    expect(mockSaveSession).toHaveBeenCalledWith(
      response.body.token,
      dummyUser
    );
    expect(mockSetCookies).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should set error messages on signup when http response is non 200", async () => {
    const RESPONSE_BODY = {};
    const response = {
      status: 404,
      body: RESPONSE_BODY
    };

    await fetchMock.mock("/api/users/signup", response, {
      overwriteRoutes: true
    });
    const name = "abc";
    const email = "abc@abc.com";
    const password = "1";
    const confirm = "1";

    await signup({
      name,
      email,
      password,
      confirm,
      ...functionParameters
    });

    expect(mockSetErrorMessages).toHaveBeenCalledTimes(1);
  });
});
