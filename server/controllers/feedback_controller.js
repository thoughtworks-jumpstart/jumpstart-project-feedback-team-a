const Feedback = require("../models/Feedback");
const User = require("../models/User");

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

const listIncomingFeedback = async (req, res) => {
  let finalOutput = [];
  try {
    let feedbackData = await Feedback.find({ receiverEmail: req.params.email });

    const output = await feedbackData.map(async feedback => {
      let user = await User.findOne({ email: feedback.giverEmail });

      return { feedback: feedback, user: user.name };
    });
    const finalOutput = await Promise.all(output);

    res.json(finalOutput);
  } catch (err) {
    return res
      .status(401)
      .json({ msg: "There was a problem. Please try again later." });
  }
};

module.exports = {
  saveFeedback,
  listIncomingFeedback
};
