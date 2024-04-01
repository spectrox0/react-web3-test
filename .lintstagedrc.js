export default {
  // Type check TypeScript files, excluding cy.ts and cy.js
  "**/*.(ts|tsx)": filenames => {
    const filteredFilenames = filenames.filter(
      name => !/cy\.(ts|js)$/.test(name)
    );
    return `pnpm tsc --noEmit --files ${filteredFilenames.join(" ")}`;
  },

  "**/*.(ts|tsx|js)": filenames => {
    const filteredFilenames = filenames.filter(
      name => !/cy\.(ts|js)$/.test(name)
    );
    return [
      `pnpm eslint --fix ${filteredFilenames.join(" ")}`,
      `pnpm prettier --write ${filteredFilenames.join(" ")}`,
    ];
  },

  // Prettify only Markdown and JSON files
  "**/*.(md|json)": filenames => `pnpm prettier --write ${filenames.join(" ")}`,
};
