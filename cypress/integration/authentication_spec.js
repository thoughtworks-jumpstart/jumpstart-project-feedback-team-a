const URL = Cypress.env("baseUrl");

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

  it("should display an error message when user already exists", () => {
    cy.visit(URL);

    cy.get("#sign-up").click();

    cy.get("input#name").type("Bob");
    cy.get("input#email").type("bob@bob.com");
    cy.get("input#password").type("password");

    cy.get("[type='submit']").click();
    cy.get(".alert-danger").contains(/^(?!\s*$).+/);
  });
});

describe("User Login", () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.get("#log-in").click();
  });
  it("should redirect to home page after valid login", () => {
    cy.get("input#email").type("bob@bob.com");
    cy.get("input#password").type("password");

    cy.get("[type='submit']").click();
    cy.url().should("eq", URL);

    cy.get(".navbar-avatar").click();
    cy.get("#log-out").click();

    cy.getCookie("token").should("eq", null);
  });

  it("should be notified if my email or password is invalid", () => {
    cy.get("input#email").type("invalid@bob.com");
    cy.get("input#password").type("password");

    cy.get("[type='submit']").click();
    cy.get(".alert-danger").contains(/^(?!\s*$).+/);

    cy
      .get("input#email")
      .clear()
      .type("Bob@bob.com");
    cy
      .get("input#password")
      .clear()
      .type("invalid");

    cy.get("[type='submit']").click();
    cy.get(".alert-danger").contains(/^(?!\s*$).+/);
  });
});
