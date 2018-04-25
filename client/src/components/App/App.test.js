import { App } from "./App";
import React from "react";
import { shallow } from "enzyme";
//import fetchMock from "fetch-mock";
import * as actions from "../../actions/auth";

describe("App", () => {
  let props, wrapper;
  beforeEach(() => {
    props = {
      cookies: {
        token: "123",
        get: jest.fn()
      },
      sessionContext: { saveSession: jest.fn() },
      sessionStorage: {
        setItem: jest.fn()
      }
    };
    wrapper = shallow(<App {...props} />);
  });

  it("should have the following structure", () => {
    expect(wrapper.find("Route")).toHaveLength(3);
  });

  it("should fetch user and set jwtToken and user", async () => {
    actions.getCurrentUser = jest.fn();
    wrapper = shallow(<App {...props} />);
    expect(actions.getCurrentUser).toHaveBeenCalledTimes(1);
  });
});
