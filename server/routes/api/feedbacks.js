const router = require("express").Router();
const handleAsyncError = require("express-async-wrap");
const { saveFeedback } = require("../../controllers/feedback_controller");

router.post("/save", handleAsyncError(saveFeedback));

module.exports = router;
