export default {
  // Type check TypeScript files, excluding cy.ts
  "**/*.(ts|tsx)": filenames => {
    const filteredFilenames = filenames.filter(
      name => !name.includes("cy.ts") && !name.includes("cy.js")
    );
    return `pnpm tsc --noEmit --files ${filteredFilenames.join(" ")}`;
  },

  // Lint & Prettify TS and JS files, excluding cy.ts and cy.js
  "**/*.(ts|tsx|js)": filenames => {
    const filteredFilenames = filenames.filter(
      name => !name.includes("cy.ts") && !name.includes("cy.js")
    );
    return [
      `pnpm eslint --fix ${filteredFilenames.join(" ")}`,
      `pnpm prettier --write ${filteredFilenames.join(" ")}`,
    ];
  },

  // Prettify only Markdown and JSON files
  "**/*.(md|json)": filenames => `pnpm prettier --write ${filenames.join(" ")}`,
};
