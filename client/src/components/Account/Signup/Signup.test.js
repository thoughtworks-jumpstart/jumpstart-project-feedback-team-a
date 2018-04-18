import React from "react";
import { shallow } from "enzyme";
import Signup from "./Signup";

describe("Signup", () => {
  it("should render the Name, Email Address, Password, Confirm Password", () => {
    const props = { messageContext: { messages: {} } };
    const wrapper = shallow(<Signup {...props} />);

    expect(wrapper.find(".form-control").exists()).toEqual(true);
    expect(wrapper.contains(<label htmlFor="name">Name</label>)).toEqual(true);
    expect(wrapper.contains(<label htmlFor="email">Email</label>)).toEqual(
      true
    );
    expect(
      wrapper.contains(<label htmlFor="password">Password</label>)
    ).toEqual(true);
    expect(
      wrapper.contains(<label htmlFor="password">Confirm Password</label>)
    ).toEqual(true);
  });
});
