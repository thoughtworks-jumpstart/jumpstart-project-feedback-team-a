process.env.NODE_ENV = "test";

const testDB = require("../test_helper/in_memory_mongodb_setup");
const fixtureLoader = require("../test_helper/fixtures");
const fixtures = require("../test_helper/fixtures").fixtures;
const request = require("supertest");
const app = require("../app");
const random = require("../utils/crypto_promise");
jest.mock("../utils/email_service.js", () => {
  return { sendText: jest.fn() };
});

beforeAll(testDB.setup);
beforeAll(fixtureLoader.load);

afterAll(testDB.teardown);

it("should call the forgot Password API and send an email", async () => {
  try {
    const email = fixtures.users.tom.email;
    const token = await random(16);

    let response = await request(app)
      .post("/api/user/forgot-password")
      .send({
        user: { email, token: token }
      });

    await expect(response.status).toEqual(200);
  } catch (error) {
    throw error;
  }
});
