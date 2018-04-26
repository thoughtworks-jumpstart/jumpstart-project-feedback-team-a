import React from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { ProviderContext, subscribe } from "react-contextual";
import moment from "moment";

class PendingRequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    try {
      const data = await feedbackProcess.listPendingRequest({
        email: JSON.parse(sessionStorage.currentLoggedInUser).email,
        messageContext: this.props.messageContext
      });

      await this.setState({ data: data });
    } catch (err) {
      throw err;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          You have pending requests from:
          {this.state.data.map((item, i) => (
            <div key={i}>
              <p>
                {item.giverEmail} received on{" "}
                {moment(item.createdAt).format("DD MMMM YYYY, h:mm a")}
              </p>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
const mapContextToProps = context => {
  return {
    ...mapMessageContextToProps(context),
    ...mapSessionContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  PendingRequestList
);
