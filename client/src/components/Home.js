import React from "react";
import Messages from "./Messages";
import { object } from "prop-types";
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapMessageContextToProps,
  messageContextPropType
} from "../components/context_helper";

class Home extends React.Component {
  static propTypes = {
    history: object.isRequired,
    ...messageContextPropType
  };

  componentWillUnmount() {
    this.props.messageContext.clearMessages();
  }

  render() {
    return (
      <div className="container">
        <Messages messages={this.props.messageContext.messages} />
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel">
              <div className="panel-body">
                <h3>myFeedback</h3>
                <p>Welcome to myFeedback. Click on Sign Up to start</p>
                <a href="about:blank" role="button" className="btn btn-default">
                  View details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapContextToProps = context => {
  return mapMessageContextToProps(context);
};

export default subscribe(ProviderContext, mapContextToProps)(Home);
