const Feedback = require("../models/Feedback");

async function saveFeedback(req, res) {
  let feedback = new Feedback();
  console.log(req.body);
  feedback.receiverEmail = req.body.user.email;

  await feedback.save();
  return res.json("Feedback saved!");
}

module.exports = {
  saveFeedback
};
