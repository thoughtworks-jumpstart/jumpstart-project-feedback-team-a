import React from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { ProviderContext, subscribe } from "react-contextual";
import moment from "moment";
import "./PendingRequestList.css";

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
        <div>
          <h1>
            Pending requests <span class="badge">{this.state.data.length}</span>
          </h1>
          <div className="pendingRequestContainer">
            <ul>
              {this.state.data.map((item, i) => (
                <div key={i}>
                  <li>
                    <strong>{item.giverEmail}</strong>{" "}
                    {moment(item.createdAt).format("DD MMMM YYYY, h:mm a")}
                  </li>
                </div>
              ))}
            </ul>
          </div>
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
