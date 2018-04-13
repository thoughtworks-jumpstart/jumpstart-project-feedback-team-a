const test_mongodb = require("../test_helper/in_memory_mongodb_setup");
const ValidationError = require("mongoose").ValidationError;

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

const Feedback = require("./Feedback");

describe("Feedback model", () => {
  const giverEmail = "gavin@example.com";
  const receiverEmail = "kevin@example.com";
  let feedback = new Feedback({
    receiverEmail: receiverEmail,
    giverEmail: giverEmail,
    feedbackGood: "good feedback",
    feedbackImprove: "improvement feedback",
    feedbackAction: "action feedback"
  });

  it("can be saved", async () => {
    await expect(feedback.save()).resolves.toBe(feedback);
  });

  it("has some required fields", async () => {
    let feedbackWithoutEmail = new Feedback({
      feedbackGood: "good feedback",
      feedbackImprove: "improvement feedback",
      feedbackAction: "action feedback"
    });
    await expect(feedbackWithoutEmail.save()).rejects.toThrow(ValidationError);
  });
});
