import React from "react";
import * as feedbackProcess from "../../actions/feedbackProcess";
import { ProviderContext, subscribe } from "react-contextual";
import Messages from "../Messages/Messages";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { withCookies } from "react-cookie";
import NavigationPrompt from "react-router-navigation-prompt";
import { Modal, Button } from "react-bootstrap";

// import { setMessageWithTimeout } from "../../actions/auth";
// const TIMEOUTFOR = 3000;

class RequestFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      email: "",
      savedEmail: "",
      show: true,
      isDraft: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (
      window.confirm(
        `Please confirm if you would like to send this feedback to the following recipient: ${
          this.state.email
        }?`
      )
    ) {
      await this.setState({ isDraft: !this.state.isDraft });
      return fetch("/api/feedbacks/save", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback: {
            receiverEmail: this.state.email,
            giverEmail: this.props.sessionContext.user.email,
            feedbackGood: "",
            feedbackImprove: "",
            feedbackAction: "",
            isPending: true
          }
        })
      }).then(response => {
        let routerHistory = this.props.history;
        if (response.ok) {
          routerHistory.push("/");
          return response.json().then(data => {
            // const messages = [{ msg: data.msg }];
            const pendingRequestId = data.pendingRequestId;

<<<<<<< HEAD
            feedbackProcess.sendRequestFeedbackEmail(
              this.state.email,
              this.props.messageContext,
              this.props.sessionContext,
              pendingRequestId
            );
          });
        } else {
          return response.json().then(json => {
            if (json.msg === undefined) {
              const messages = [
                { msg: "Server error. Please try again later" }
              ];
              const identifier = "error";
              setMessageWithTimeout(
                this.props.messageContext,
                messages,
                TIMEOUTFOR,
                identifier
              );
            } else {
              const messages = [json];
              const idenfitier = "error";
              setMessageWithTimeout(
                this.props.messageContext,
                messages,
                TIMEOUTFOR,
                idenfitier
              );
            }
          });
        }
      });
    }
=======
    await this.setState({ isDraft: !this.state.isDraft });
    return fetch("/api/feedbacks/save", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedback: {
          receiverEmail: this.state.email,
          giverEmail: this.props.sessionContext.user.email,
          feedbackGood: "",
          feedbackImprove: "",
          feedbackAction: "",
          isPending: true
        }
      })
    }).then(response => {
      //let routerHistory = this.props.history;
      if (response.ok) {
        //routerHistory.push("/");

        return response.json().then(data => {
          // const messages = [{ msg: data.msg }];
          const pendingRequestId = data.pendingRequestId;

          feedbackProcess.sendRequestFeedbackEmail(
            this.state.email,
            this.props.messageContext,
            this.props.sessionContext,
            pendingRequestId
          );
          this.setState({ savedEmail: this.state.email });
          this.setState({ email: "" });
        });
      } else {
        return response.json().then(json => {
          if (json.msg === undefined) {
            const messages = [{ msg: "Server error. Please try again later" }];

            this.props.messageContext.setErrorMessages(messages);
          } else {
            const messages = [json];

            this.props.messageContext.setErrorMessages(messages);
          }
        });
      }
    });
>>>>>>> [Ben/Yamin][#67] Added NavigationPrompt and Bootstrap Modal
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    });
    await this.setState({
      isDraft: this.state.email.length > 0
    });
  }

  render() {
    return (
<<<<<<< HEAD
      <div style={{ marginTop: "20px" }} className="container">
        <Messages messages={this.props.messageContext.messages} />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1 style={{ display: "inline" }}>Request for Feedback</h1>
          <button
            style={{ display: "inline" }}
            className="btn btn-success pull-right"
            disabled={!this.state.isDraft}
          >
            Send
          </button>
          <div style={{ marginTop: "20px" }} className="form-group">
            <label>Add Registered User Email address</label>
            <input
              style={{ display: "inline" }}
              type="email"
              name="email"
              className="form-control"
              id="emailAddress"
              placeholder="Email"
              onChange={this.handleChange.bind(this)}
            />
=======
      <React.Fragment>
        <div className="container">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1 style={{ display: "inline" }}>Request for Feedback</h1>
            <button
              style={{ display: "inline" }}
              className="btn btn-success pull-right"
              disabled={!this.state.isDraft}
              data-toggle="modal"
              data-target="#myModal"
            >
              Send
            </button>
            <div style={{ marginTop: "20px" }} className="form-group">
              <label>Add Registered User Email address</label>
              <input
                value={this.state.email}
                style={{ display: "inline" }}
                type="email"
                name="email"
                className="form-control"
                id="emailAddress"
                placeholder="Email"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <hr />
            {this.state.isDraft && (
              <NavigationPrompt
                beforeConfirm={this.cleanup}
                // Children will be rendered even if props.when is falsey and isActive is false:
                renderIfNotActive={true}
                // Confirm navigation if going to a path that does not start with current path:
                when={(crntLocation, nextLocation) =>
                  !nextLocation.pathname.startsWith(crntLocation.pathname)
                }
              >
                {({ isActive, onCancel, onConfirm }) => {
                  console.log(isActive);
                  if (isActive) {
                    return (
                      <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h4>Text in a modal</h4>
                          <p>
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                          </p>

                          <h4>Popover in a modal</h4>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                      </Modal>
                    );
                  }
                  return (
                    <div>This is probably an anti-pattern but ya know...</div>
                  );
                }}
              </NavigationPrompt>
            )}
          </form>
        </div>

        {/* <button
          type="button"
          class="btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >
          Launch demo modal
        </button> */}

        <div
          class="modal fade"
          id="myModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  myTitle
                </h4>
              </div>
              <div class="modal-body">
                <Messages messages={this.props.messageContext.messages} />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {/* <button type="button" class="btn btn-primary">
                  Save changes
                </button> */}
              </div>
            </div>
>>>>>>> [Ben/Yamin][#67] Added NavigationPrompt and Bootstrap Modal
          </div>
          <hr />
          <Prompt
            when={this.state.isDraft}
            message="Your feedback hasn't been submitted. Are you sure you want to leave this page?"
          />
        </form>
      </div>
    );
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    ...mapMessageContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  withCookies(RequestFeedback)
);
