const URL = Cypress.env("baseUrl");
const TEST_USER_EMAIL = `${Date.now()}@a.com`;
const PASSWORD = "1";

describe("Authentication", () => {
  context("Sign Up", () => {
    it("test that password and confirm fields must match", () => {
      cy.visit(URL);
      cy.get("#sign-up").click();
      cy.get("input#name").type("Bob");
      cy.get("input#email").type(TEST_USER_EMAIL);
      cy.get("input#password").type(PASSWORD);
      cy.get("input#confirm").type("differentpassword");
      cy.get("[type='submit']").click();
      cy
        .get(".alert-danger")
        .contains("Your confirmed password does not match the new password");
    });

    it("successful signup", () => {
      cy
        .get("input#confirm")
        .clear()
        .type(PASSWORD);
      cy.get("[type='submit']").click();
      cy.get("#user-name").contains("Bob");
    });

    it("successful logout", () => {
      cy.get(".navbar-avatar").click();
      cy.get("a#log-out").click();
    });

    it("existing user should not be able to sign-up", () => {
      cy.get("#sign-up").click();
      cy.get("input#name").type("Bob");
      cy.get("input#email").type(TEST_USER_EMAIL);
      cy.get("input#password").type(PASSWORD);
      cy.get("input#confirm").type(PASSWORD);
      cy.get("[type='submit']").click();
      cy
        .get(".alert-danger")
        .contains(
          "The email address you have entered is already associated with another account."
        );
    });
  });

  context("Log in", () => {
    it("validate email and password", () => {
      cy.get("#log-in").click();
      cy.get("input#email").type("invalid@bob.com");
      cy.get("input#password").type(PASSWORD);

      cy.get("[type='submit']").click();
      cy.get(".alert-danger").contains("Your email or password is invalid");

      cy
        .get("input#email")
        .clear()
        .type("Bob@bob.com");
      cy
        .get("input#password")
        .clear()
        .type("invalid");

      cy.get("[type='submit']").click();
      cy.get(".alert-danger").contains("Your email or password is invalid");
    });

    it("successful login", () => {
      cy.visit(URL);
      cy.get("#log-in").click();

      cy.get("input#email").type(TEST_USER_EMAIL);
      cy.get("input#password").type(PASSWORD);

      cy.get("[type='submit']").click();
      cy.url().should("eq", URL);

      cy.get(".navbar-avatar").click();
      cy.get("#log-out").click();

      cy.getCookie("token").should("eq", null);
    });
  });
});
