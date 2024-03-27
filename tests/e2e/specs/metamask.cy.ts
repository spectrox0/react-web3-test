describe("Metamask test", () => {
  it("should connect to metamask", () => {
    cy.visit("http://localhost:5173");
    cy.get("#connect-metamask").click();
    cy.get("#metamask-connect").should("be.visible");
  });
});
