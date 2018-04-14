import Signup from "./Signup";
import React from "react";
import { shallow } from "enzyme";

describe("Signup", () => {
  it("should should have the following structure", () => {
    const props = { messageContext: { messages: {} } };
    const wrapper = shallow(<Signup {...props} />);
    expect(wrapper.find(".login-container")).toHaveLength(1);
  });
});
