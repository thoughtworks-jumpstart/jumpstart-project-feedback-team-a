import React from "react";
import Feedback from "./Feedback";
import { shallow } from "enzyme";
import { withRouter } from "react-router-dom";
import * as feedbackProcess from "../../actions/feedbackProcess.js";

describe("Feedback", () => {
  it("should render correctly", () => {
    const props = { messageContext: { messages: {} } };
    const wrapper = shallow(<Feedback {...props} />);
    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("textarea")).toHaveLength(3);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should set isDraft to true when total character count on the form is more than 0", async () => {
    const props = { messageContext: { messages: {} } };
    const wrapper = shallow(<Feedback {...props} />);
    let event = {
      target: {
        name: "email",
        value: "email@email.com"
      }
    };
    wrapper.state().feedbackGood = "1";
    await wrapper
      .find("input")
      .props()
      .onChange(event);
    expect(wrapper.state().isDraft).toEqual(true);

    wrapper.update();
    expect(wrapper.find("Prompt").props().when).toEqual(true);
  });

  it("should save feedback when handleSubmit is called", () => {
    feedbackProcess.saveFeedback = jest.fn();
    const props = {
      messageContext: { messages: {} },
      sessionContext: { user: { email: "" } }
    };
    const wrapper = shallow(<Feedback {...props} />);
    const event = { preventDefault: () => {} };
    wrapper
      .find("form")
      .props()
      .onSubmit(event);
    expect(feedbackProcess.saveFeedback).toHaveBeenCalledTimes(1);
  });
});
