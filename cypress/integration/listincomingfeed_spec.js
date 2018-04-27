const URL = Cypress.env("baseUrl");

describe.skip("Inbox", () => {
  let user1 = `${Math.random()}@a.com`;
  //setTimeout(() => {}, 10000);
  let user2 = `${Math.random()}@a.com`;

  before(() => {
    //cy.visit(URL);

    cy.get("#sign-up").click();

    cy.get("input#name").type("User1");
    cy.get("input#email").type(user1);
    cy.get("input#password").type("1");
    cy.get("input#confirm").type("1");

    cy.get("[type='submit']").click();

    cy.get(".navbar-avatar").click();
    cy.get("#log-out").click();

    cy.get("#sign-up").click();

    cy.get("input#name").type("User2");
    cy.get("input#email").type(user2);
    cy.get("input#password").type("1");
    cy.get("input#confirm").type("1");

    cy.get("[type='submit']").click();

    cy.get(".navbar-avatar").click();
    cy.get("#log-out").click();
  });

  it("should display a list of incoming feedback", () => {
    cy.get("#log-in").click();
    cy.get("input#email").type(user1);
    cy.get("input#password").type("1");
    cy.get("[type='submit']").click();

    cy.get("#feedback").click();
    cy.get("input#emailAddress").type(user2);
    cy.get("textarea#feedbackItem1").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem2").type("Now I am trying to save feedback");
    cy.get("textarea#feedbackItem3").type("Now I am trying to save feedback");
    cy.get("button.btn-success").click();
    cy.get(".alert-success").contains(/^(?!\s*$).+/);

    cy.get(".navbar-avatar").click();
    cy.get("#log-out").click();

    cy.get("#log-in").click();
    cy.get("input#email").type(user2);
    cy.get("input#password").type("1");
    cy.get("[type='submit']").click();
    cy.get("#inbox").click();

    cy.get("#feedback-date").contains(/^(?!\s*$).+/);
    cy.get("#feedback-giver").contains(/^(?!\s*$).+/);
    cy.get("#feedback-good").contains(/^(?!\s*$).+/);
    cy.get("#feedback-improve").contains(/^(?!\s*$).+/);
    cy.get("#feedback-action").contains(/^(?!\s*$).+/);

    cy.get(".navbar-avatar").click();
    cy.get("#log-out").click();
  });

  it("should have a empty list if user is new", () => {
    //cy.visit(URL);

    cy.get("#log-in").click();
    cy.get("input#email").type(user1);
    cy.get("input#password").type("1");
    cy.get("[type='submit']").click();
    cy.get("#inbox").click();

    cy.get("#feedback-date").should("have.length", 0);
  });
});
