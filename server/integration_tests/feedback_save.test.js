process.env.NODE_ENV = "test";

const testDB = require("../test_helper/in_memory_mongodb_setup");
const fixtureLoader = require("../test_helper/fixtures");
const fixtures = require("../test_helper/fixtures").fixtures;
const request = require("supertest");
const app = require("../app");

beforeAll(testDB.setup);
beforeAll(fixtureLoader.load);

afterAll(testDB.teardown);

describe("Feedback saving scenarios", () => {
  it("should return success message on successfully saving to DB", async () => {
    const feedbackObject = {
      receiverEmail: "test@email.com",
      giverEmail: "test@email.com",
      feedbackGood: "test",
      feedbackImprove: "test",
      feedbackAction: "test"
    };
    let response = await request(app)
      .post("/api/feedbacks/save")
      .send({
        feedback: feedbackObject
      });
    expect(response.statusCode).toBe(200);
  });
});
