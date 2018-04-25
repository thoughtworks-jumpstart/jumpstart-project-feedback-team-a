import React from "react";
import FeedbackForm from "./FeedbackForm";
import { shallow } from "enzyme";
import * as feedbackProcess from "../../actions/feedbackProcess.js";

let props;
describe("FeedbackForm", () => {
  beforeEach(() => {
    props = {
      messageContext: { messages: {} },
      location: { search: "" },
      sessionContext: { user: {} }
    };
  });

  it("should render correctly", () => {
    const wrapper = shallow(<FeedbackForm {...props} />);
    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("textarea")).toHaveLength(3);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should set isDraft to true when total character count on the form is more than 0", async () => {
    const wrapper = shallow(<FeedbackForm {...props} />);
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

  it("should save feedbackForm when handleSubmit is called", () => {
    window.confirm = jest.fn(() => true);
    feedbackProcess.saveFeedback = jest.fn();
    const wrapper = shallow(<FeedbackForm {...props} />);
    const event = { preventDefault: () => {} };
    wrapper
      .find("form")
      .props()
      .onSubmit(event);
    expect(feedbackProcess.saveFeedback).toHaveBeenCalledTimes(1);
  });
});
