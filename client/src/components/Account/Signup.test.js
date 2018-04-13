import Signup from "./Signup";
import React from "react";
import { shallow } from "enzyme";

describe("Signup", () => {
  it("should should have the following structure", () => {
    const wrapper = shallow(<Signup />);
    console.log(wrapper.debug());
  });
});
