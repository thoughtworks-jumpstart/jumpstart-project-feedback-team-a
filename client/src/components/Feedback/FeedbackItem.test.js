import React from "react";
import { shallow } from "enzyme";
import FeedbackItem from "./FeedbackItem";

describe("FeedbackItem", () => {
  it("should render properly", () => {
    const item = {
      user: "bob",
      feedback: {
        createdAt: "",
        feedbackGood: "good",
        feedbackImprove: "improve",
        feedbackAction: "action"
      }
    };
    const wrapper = shallow(<FeedbackItem feedback={item} />);
    expect(
      wrapper
        .find("#feedback-giver")
        .text()
        .includes(item.user)
    ).toEqual(true);
    expect(wrapper.find("#feedback-good").text()).toEqual(
      item.feedback.feedbackGood
    );

    expect(wrapper.find("#feedback-improve").text()).toEqual(
      item.feedback.feedbackImprove
    );

    expect(wrapper.find("#feedback-action").text()).toEqual(
      item.feedback.feedbackAction
    );
  });
});
