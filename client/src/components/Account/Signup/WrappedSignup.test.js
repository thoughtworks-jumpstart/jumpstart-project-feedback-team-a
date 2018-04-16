import { WrappedSignup } from "./WrappedSignup";
import React from "react";
import { shallow } from "enzyme";
import { Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

describe("WrappedSignup", () => {
  it("should should have the following structure", () => {
    const props = {
      history: {},
      cookies: instanceOf(Cookies),
      messageContext: { messages: {} },
      sessionContext: { session: {} }
    };
    const wrapper = shallow(<WrappedSignup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
