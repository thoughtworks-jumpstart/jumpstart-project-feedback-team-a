const URL = Cypress.env("baseUrl");

describe("List of Incoming Feedbacks", () => {
  it("should display a list of incoming feedback", () => {
    cy.visit(URL);

    cy.get("#log-in").click();

    cy.get("input#email").type("bob@bob.com");
    cy.get("input#password").type("1");

    cy.get("[type='submit']").click();

    cy.get("#listIncomingFeedback").click();

    cy.get("#feedback-date").contains(/^(?!\s*$).+/);
    cy.get("#feedback-giver").contains(/^(?!\s*$).+/);
    cy.get("#feedback-well").contains(/^(?!\s*$).+/);
    cy.get("#feedback-better").contains(/^(?!\s*$).+/);
    cy.get("#feedback-improve").contains(/^(?!\s*$).+/);
  });

  it("should have a empty list if user is new", () => {
    cy.visit(URL);

    cy.get("#sign-up").click();

    cy.get("input#name").type("Bob");
    cy.get("input#email").type(`${Date.now()}@a.com`);
    cy.get("input#password").type("1");
    cy.get("input#confirm").type("1");

    cy.get("[type='submit']").click();

    cy.get("#listIncomingFeedback").click();

    cy.get("#feedback-date").should("have.length", 0);
  });
});
