import { WrappedSignup } from "./WrappedSignup";
import React from "react";
import { shallow } from "enzyme";

describe("WrappedSignup", () => {
  it("should should have the following structure", () => {
    const props = {};
    const wrapper = shallow(<WrappedSignup {...props} />);
    expect(wrapper).toMatchSnapshot();
    console.log(wrapper.prop("handleChange"));
  });
});
