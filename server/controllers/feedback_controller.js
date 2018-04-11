const Feedback = require("../models/Feedback");

async function saveFeedback(req, res) {
  let feedback = new Feedback();
  feedback.receiverEmail = req.body.feedback.receiverEmail;

  try {
    await feedback.save();
    return res.json("Feedback saved!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  saveFeedback
};
