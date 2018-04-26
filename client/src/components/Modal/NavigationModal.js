import React from "react";

export default class NavigationModal extends React.Component {
  render() {
    return (
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
                My Header
              </h4>
            </div>
            <div class="modal-body">
              Are you sure you want to navigate away before sending your
              request?
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
        </div>
      </div>
    );
  }
}
