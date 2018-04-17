const Feedback = require("../models/Feedback");

async function saveFeedback(req, res) {
  let feedback = new Feedback();
  feedback.receiverEmail = req.body.feedback.receiverEmail;
  feedback.giverEmail = req.body.feedback.giverEmail;
  feedback.feedbackGood = req.body.feedback.feedbackGood;
  feedback.feedbackImprove = req.body.feedback.feedbackImprove;
  feedback.feedbackAction = req.body.feedback.feedbackAction;

  try {
    await feedback.save();

    return res.json({ msg: "Your feedback is saved successfully." });
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "There was a problem. Please try again later." });
  }
}

async function listIncomingFeedback(req, res) {
  let feedback = new Feedback();
  //console.log(req.body.json);
  try {
    console.log(req.params.email);

    const feedbackData = await Feedback.find(
      { receiverEmail: req.params.email },
      (err, data) => {
        return data;
      }
    );
    res.json(feedbackData);
  } catch (err) {
    return res
      .status(401)
      .json({ msg: "There was a problem. Please try again later." });
  }
}

module.exports = {
  saveFeedback,
  listIncomingFeedback
};
