const URL = Cypress.env("baseUrl");
const RECIPIENT_EMAIL = "bond@bond.com";

describe("Give Feedback Form", () => {
  const USER1 = `${Math.random()}@a.com`;
  const PASSWORD = "1";

  before(() => {
    cy.visit(URL);
    cy.get("#sign-up").click();

    cy.get("input#name").type("Bob");
    cy.get("input#email").type(USER1);
    cy.get("input#password").type(PASSWORD);
    cy.get("input#confirm").type(PASSWORD);
    cy.get("[type='submit']").click();
  });

  after(() => {
    cy.get(".navbar-avatar").click();
    cy.get("#my-account").click();

    cy.get("button.btn-danger").click();
  });

  it("clicking and accessing Give Feedback form", () => {
    cy.get("#feedback").should("have.attr", "href", "/feedback");
    cy.get("#feedback").click();
    cy.get("input#emailAddress").type("vic@vic.com");
    cy.get("textarea#feedbackItem1").should("be.visible");
    cy.get("textarea#feedbackItem2").should("be.visible");
    cy.get("textarea#feedbackItem3").should("be.visible");
  });

  it("should prompt when form is not saved", () => {
    cy.get("textarea#feedbackItem1").type("i am typing your feedback");
    cy.get("a.navbar-brand").click();
    cy.url().should("eq", URL);
  });

  it("Send button disabled when email is not completed", () => {
    cy.get("#feedback").click();
    cy.get("input#emailAddress").type("a");
    cy.get("textarea#feedbackItem1").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem2").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem3").type("Now I am trying to save feedback");
    cy.get("button.btn-success").click();
    cy.get("textarea#feedbackItem1").clear();
    cy.get("textarea#feedbackItem2").clear();
    cy.get("textarea#feedbackItem3").clear();
    cy.get("button.btn-success").should("be.disabled");
  });

  it("create feedback successfully", () => {
    cy.get("input#emailAddress").type(RECIPIENT_EMAIL);
    cy.get("textarea#feedbackItem1").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem2").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem3").type("Now I am trying to save feedback");
    cy.get("button.btn-success").click();

    cy.on("window:confirm", str => {
      expect(str).to.contains(
        "Please confirm if you would like to send this feedback"
      );
      expect(str).to.contains(RECIPIENT_EMAIL);
      return true;
    });

    cy.url().should("eq", URL);
  });
});
