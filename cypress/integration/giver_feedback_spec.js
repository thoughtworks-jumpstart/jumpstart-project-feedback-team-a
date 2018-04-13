const URL = Cypress.env("baseUrl");

describe("Giver Feedback Form", () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.get("#log-in").click();
    cy.get("input#email").type("bob@bob.com");
    cy.get("input#password").type("password");
    cy.get("[type='submit']").click();
  });

  it("should see the Give Feedback link after log in", () => {
    cy.get("#feedback").should("have.attr", "href", "/feedback");
  });

  it("should see the four fields in the template after clicking link", () => {
    cy.get("#feedback").click();
    cy.get("input#emailAddress").type("vic@vic.com");
    cy.get("textarea#feedbackItem1").should("be.visible");
    cy.get("textarea#feedbackItem2").should("be.visible");
    cy.get("textarea#feedbackItem3").should("be.visible");
  });

  it("should see the prompt that he has not saved the feedback", () => {
    cy.get("#feedback").click();
    cy.get("textarea#feedbackItem1").type("i am typing your feedback");
    cy.get("a.navbar-brand").click();
    cy.url().should("eq", URL);
  });

  it("should see confirmation that feedback is saved successfully", () => {
    cy.get("#feedback").click();
    cy.get("input#emailAddress").type("vic@vic.com");
    cy.get("textarea#feedbackItem1").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem2").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem3").type("Now I am trying to save feedback");
    cy.get("button.btn-success").click();
    cy.get(".alert-success").contains(/^(?!\s*$).+/);
  });

  it("should see error message that saving his feedback was unsuccessful", () => {
    cy.get("#feedback").click();
    cy.get("textarea#feedbackItem1").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem2").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem3").type("Now I am trying to save feedback");
    cy.get("button.btn-success").click();
    cy.get(".alert-danger").contains(/^(?!\s*$).+/);
  });
});
