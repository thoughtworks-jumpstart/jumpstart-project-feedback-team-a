const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    receiverEmail: {
      type: String,
      lowercase: true,
      required: [true, "cannot be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"]
    }
    // giverEmail: {
    //   type: String,
    //   lowercase: true,
    //   unique: true,
    //   required: [true, "cannot be blank"],
    //   match: [/\S+@\S+\.\S+/, "is invalid"],
    //   index: true
    // },
    // feedbackGood: String,
    // feedbackImprove: String,
    // feedbackAction: String,

    // status: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
