import { shallow } from "enzyme";
import React from "react";
import Messages from "./Messages";

describe("Types of Messages", () => {
  it("should render Success message alert...", () => {
    const wrapper = shallow(
      <Messages messages={{ success: [{ msg: "Passed" }] }} />
    );

    expect(wrapper.find(".alert-success")).toHaveLength(1);
  });
});
