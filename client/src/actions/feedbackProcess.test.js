import fetchMock from "fetch-mock";
import { saveFeedback } from "./feedbackProcess";

let mockSetSuccessMessages;
let mockClearMessages;
let mockSetErrorMessages;
let requestPayload;

describe("Feedback Process", () => {
  beforeEach(() => {
    mockSetSuccessMessages = jest.fn();
    mockClearMessages = jest.fn();
    mockSetErrorMessages = jest.fn();

    requestPayload = {
      email: "some value",
      giver: "some value",
      feedbackGood: "some value",
      feedbackImprove: "some value",
      feedbackAction: "some value",
      messageContext: {
        setSuccessMessages: mockSetSuccessMessages,
        clearMessages: mockClearMessages,
        setErrorMessages: mockSetErrorMessages
      },
      routerHistory: { push: () => {} }
    };
  });

  it("should setSuccessMessages when HTTP responds with 200 and a msg object", async () => {
    const response = {
      status: 200,
      body: { msg: "test" }
    };
    await fetchMock.mock("/api/feedbacks/save", response);

    await saveFeedback(requestPayload);

    expect(mockClearMessages).toHaveBeenCalledTimes(1);
    expect(mockSetSuccessMessages).toHaveBeenCalledTimes(1);
    expect(mockSetSuccessMessages).toBeCalledWith([response.body]);
  });

  it("should setErrorMessages when HTTP responds with a non-200 status and no msg object", async () => {
    const response = {
      status: 400, // this test will cover any non-200 response statuses
      body: {}
    };

    await fetchMock.mock("/api/feedbacks/save", response, {
      overwriteRoutes: true
    });

    await saveFeedback(requestPayload);
    expect(mockClearMessages).toHaveBeenCalledTimes(1);
    expect(mockSetErrorMessages).toHaveBeenCalledTimes(1);
    expect(mockSetErrorMessages).toHaveBeenCalledWith([
      { msg: "Server error. Please try again later" }
    ]);
  });

  it("should setErrorMessages when HTTP responds with a non-200 status and a msg object", async () => {
    const response = {
      status: 400, // this test will cover any non-200 response statuses
      body: { msg: "test" }
    };

    await fetchMock.mock("/api/feedbacks/save", response, {
      overwriteRoutes: true
    });

    await saveFeedback(requestPayload);

    expect(mockClearMessages).toHaveBeenCalledTimes(1);
    expect(mockSetErrorMessages).toHaveBeenCalledTimes(1);
    expect(mockSetErrorMessages).toHaveBeenCalledWith([response.body]);
  });
});
