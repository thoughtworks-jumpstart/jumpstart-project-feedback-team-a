import { FeedbackList } from "./FeedbackList";
import React from "react";
import { shallow } from "enzyme";
import * as feedbackProcess from "../../actions/feedbackProcess";

describe("Listing of Incoming Feedbacks", () => {
  let props;

  beforeEach(() => {
    props = {
      messageContext: {
        messages: {}
      },
      sessionContext: {
        user: {
          email: ""
        }
      }
    };
  });
  it("should render Incoming Feedback page properly", () => {
    const wrapper = shallow(<FeedbackList {...props} />);
    expect(
      wrapper
        .find("h1")
        .text()
        .includes("Your Feedback")
    ).toEqual(true);
    wrapper.setState({ feedbackArray: [1, 2, 3] });
    expect(wrapper.find("FeedbackItem")).toHaveLength(3);
  });

  it("should setState with feedbacks after component mounts", async () => {
    const FEEDBACK_LIST = ["feedback 1", "feedback 2"];
    feedbackProcess.listIncomingFeedback = jest.fn(() =>
      Promise.resolve(FEEDBACK_LIST)
    );
    const wrapper = await shallow(<FeedbackList {...props} />);

    expect(wrapper.state().feedbackArray).toEqual(FEEDBACK_LIST);
  });
});
