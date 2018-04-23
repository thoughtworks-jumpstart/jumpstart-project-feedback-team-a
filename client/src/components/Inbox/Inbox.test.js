import React from "react";

import { shallow } from "enzyme";
import RequestList from "./Inbox";

describe("Inbox", () => {
  it("should render Feedback and Request Lists", () => {
    const wrapper = shallow(<RequestList />);
    expect(wrapper.find(".container").children()).toHaveLength(2);
  });
});
