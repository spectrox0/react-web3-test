describe("Metamask test", () => {
  before(() => {
    cy.visit("http://localhost:5173");
    cy.get("#connect-metamask").should("be.visible");
    cy.get("#connect-metamask").click();
    // cy.wait(5000);
    cy.switchToMetamaskWindow();

    cy.acceptMetamaskAccess().should("be.true");
    // cy.confirmMetamaskSignatureRequest();
    cy.switchToCypressWindow();
  });

  it ("I should see my wallet address", () => {
    cy.visit("http://localhost:5173");
    cy.get("#connect-metamask").should("not.exist");
    cy.get("#wallet-balance").should("be.visible");
    cy.get("#wallet-address").should("be.visible");
    cy.get("#wallet-address").should("be.visible");
    cy.get("#wallet-address").contains("0x");
  })

  it("I should get my history of transactions", () => {
    cy.visit("http://localhost:5173");
    cy.get("#tab-transaction").should("be.visible");
    cy.get("#tab-transaction").click();
    cy.wait(1000); 
    cy.get("#transaction-history").should("be.visible");
    cy.get("#transaction-history").children().should("have.length.greaterThan", 0);
  });

    it("Disconnect Wallet ",() => {
    cy.visit("http://localhost:5173");
    cy.switchToMetamaskWindow();
    cy.disconnectMetamaskWalletFromDapp()
    cy.disconnectMetamaskWalletFromAllDapps()
    cy.switchToCypressWindow();
    cy.get("#connect-metamask").should("be.visible");
  });
});
describe("Dark mode test", () => {
  it("I should be able to switch to dark mode", () => {
    cy.visit("http://localhost:5173");

    cy.get("html").then(($body) => {
      const isInitiallyDark = $body.hasClass("dark");

      cy.get("#theme-switch").click();

      if (isInitiallyDark) {
        cy.get("html").should("not.have.class", "dark");
      } else {
        cy.get("html").should("have.class", "dark");
      }

      cy.get("#theme-switch").click();
      if (isInitiallyDark) {
        cy.get("html").should("have.class", "dark");
      } else {
        cy.get("html").should("not.have.class", "dark");
      }
    });
  });
})