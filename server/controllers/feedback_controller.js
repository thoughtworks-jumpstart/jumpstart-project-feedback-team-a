const Feedback = require("../models/Feedback");
const User = require("../models/User");
const mailer = require("../utils/email_service");
const random = require("../utils/crypto_promise");
const {
  isLocal,
  frontendPort,
  systemEmailAddress,
  applicationName
} = require("../config");

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

const getHostAndPort = req => {
  if (isLocal) {
    return "localhost:" + frontendPort;
  } else {
    return req.headers.host;
  }
};

const sendRequestFeedbackEmail = async (req, res) => {
  const token = await random(16);
  const toAddress = req.params.email;

  const user = await User.findOne({ email: toAddress });
  if (!user) {
    return res.status(400).send({
      msg: `The email address ${toAddress} is not associated with any account.`
    });
  }
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000; // expire in 1 hour
  await user.save();

  const fromAddress = systemEmailAddress;
  const subject = "Provide Your Feedback for " + applicationName;
  const text =
    `Hi! ${user.name} would like some feedback from you. Click here to give ${
      user.name
    } feedback via myFeedback.\n\n` +
    "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
    "http://" +
    getHostAndPort(req) +
    "/feedback/" +
    token +
    "\n\n";
  mailer.sendText(fromAddress, toAddress, subject, text);

  res.send({
    msg:
      "An email has been sent to " + toAddress + " with further instructions."
  });
};

module.exports = {
  saveFeedback,
  listIncomingFeedback,
  sendRequestFeedbackEmail
};
