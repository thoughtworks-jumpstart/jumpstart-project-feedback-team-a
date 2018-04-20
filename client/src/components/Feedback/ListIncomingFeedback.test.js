import { ListIncomingFeedback } from "./ListIncomingFeedback";
import React from "react";
import { shallow } from "enzyme";

describe("Listing of Incoming Feedbacks", () => {
  it("should render Incoming Feedback page properly", () => {
    const props = {
      messageContext: {
        messages: {}
      },
      sessionContext: {
        user: {
          email: ""
        }
      }
    };
    const wrapper = shallow(<ListIncomingFeedback {...props} />);
    expect(
      wrapper
        .find("h1")
        .text()
        .includes("Your Feedback")
    ).toEqual(true);
    wrapper.setState({ feedbackArray: [1, 2, 3] });
    expect(wrapper.find("FeedbackItem")).toHaveLength(3);
  });
});
