const URL =
  process.env.NODE_ENV === "staging"
    ? "http://my-feedback-team-a-staging.herokuapp.com/"
    : "http://localhost:3000";

console.log("node env is", process.env.NODE_ENV);

describe("User Signup", () => {
  it("should sign up successfully", () => {
    cy.visit(URL);

    cy.get("#sign-up").click();

    cy.get("input#name").type("Bob");
    cy.get("input#email").type(`${Date.now()}@a.com`);
    cy.get("input#password").type("password");

    cy.get("[type='submit']").click();
    cy.get("#user-name").contains("Bob");
  });
});
