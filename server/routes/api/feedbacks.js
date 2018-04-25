const router = require("express").Router();
const handleAsyncError = require("express-async-wrap");
const {
  saveFeedback,
  updateFeedback,
  sendRequestFeedbackEmail,
  listIncomingFeedback
} = require("../../controllers/feedback_controller");

router.post("/save", handleAsyncError(saveFeedback));
router.put("/update", handleAsyncError(updateFeedback));
router.get(
  "/listIncomingFeedback/:email",
  handleAsyncError(listIncomingFeedback)
);
// router.get("/listPendingRequest/:email", handleAsyncError(listPendingRequest)); // TODO
router.get(
  "/sendRequestFeedbackEmail/:email",
  handleAsyncError(sendRequestFeedbackEmail)
);
module.exports = router;
