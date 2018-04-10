import React from "react";

const Feedback = () => {
  return (
    <div className="container">
      <form>
        <h1 style={{ display: "inline" }}>Collect Feedback</h1>
        <button
          style={{ display: "inline" }}
          className="btn btn-success pull-right"
        >
          Send
        </button>
        <div style={{ marginTop: "20px" }} className="form-group">
          <label for="emailAddress">Add Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailAddress"
            placeholder="Email"
          />
        </div>
        <hr />

        <h4>Feedback for Roy</h4>
        <div style={{ marginTop: "20px" }} className="form-group">
          <label for="name">Name (Optional)</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
          />
        </div>
        <div style={{ marginTop: "20px" }} className="form-group">
          <label for="comment">What I did well?</label>
          <textarea class="form-control" rows="5" id="feedbackItem1" />
        </div>
        <div style={{ marginTop: "20px" }} className="form-group">
          <label for="comment">What could be better?</label>
          <textarea class="form-control" rows="5" id="feedbackItem2" />
        </div>
        <div style={{ marginTop: "20px" }} className="form-group">
          <label for="comment">Suggestions for improvement?</label>
          <textarea class="form-control" rows="5" id="feedbackItem3" />
        </div>
      </form>
    </div>
  );
};

export default Feedback;
