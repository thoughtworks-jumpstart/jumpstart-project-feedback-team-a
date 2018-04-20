import React from "react";
import { shallow } from "enzyme";
import RequestFeedback from "./RequestFeedback";

let wrapper;

describe("RequestFeedback", () => {
  beforeEach(() => {
    wrapper = shallow(<RequestFeedback />);
  });
  it("should have the following elements", () => {
    expect(wrapper.find("form")).toHaveLength(1);
    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("button")).toHaveLength(1);
  });
  it("should set isDraft to true when email is having input", async () => {
    let event = {
      target: {
        name: "email",
        value: "email@email.com"
      }
    };
    await wrapper
      .find("input")
      .props()
      .onChange(event);
    expect(wrapper.state().isDraft).toEqual(true);
    wrapper.update();
    expect(wrapper.find("Prompt").props().when).toEqual(true);
  });

  it("should save feedback when handleSubmit is called", async () => {
    const event = {
      preventDefault: () => {}
    };
    await wrapper
      .find("form")
      .props()
      .onSubmit(event);
    wrapper.update();
    expect(wrapper.state().isDraft).toEqual(false);
  });
});
