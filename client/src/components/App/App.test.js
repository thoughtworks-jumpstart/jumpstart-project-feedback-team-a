import { App } from "./App";
import React from "react";
import { shallow } from "enzyme";
//import fetchMock from "fetch-mock";
import * as actions from "../../actions/auth";

describe("App", () => {
  let props, wrapper;
  beforeEach(() => {
    global.sessionStorage = {
      setItem: jest.fn()
    };
    props = {
      cookies: {
        token: "123",
        get: jest.fn()
      },
      sessionContext: { saveSession: jest.fn() }
    };
    wrapper = shallow(<App {...props} />);
  });

  it("should have the following structure", () => {
    expect(wrapper.find("Route")).toHaveLength(10);
    expect(wrapper.find("SubscribeWrap")).toHaveLength(1);
  });

  it("should fetch user and set jwtToken and user", async () => {
    actions.getCurrentUser = jest.fn();
    const props = {
      cookies: {
        token: "123",
        get: jest.fn()
      },
      sessionContext: { saveSession: jest.fn() }
    };
    wrapper = shallow(<App {...props} />);
    expect(actions.getCurrentUser).toHaveBeenCalledTimes(1);
  });
});
