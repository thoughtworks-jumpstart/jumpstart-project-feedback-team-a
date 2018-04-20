const router = require("express").Router();
const handleAsyncError = require("express-async-wrap");
const {
  saveFeedback,
  sendRequestFeedbackEmail
} = require("../../controllers/feedback_controller");
const {
  listIncomingFeedback
} = require("../../controllers/feedback_controller");

router.post("/save", handleAsyncError(saveFeedback));
router.get(
  "/listIncomingFeedback/:email",
  handleAsyncError(listIncomingFeedback)
);
router.get(
  "/sendRequestFeedbackEmail/:email",
  handleAsyncError(sendRequestFeedbackEmail)
);
module.exports = router;
