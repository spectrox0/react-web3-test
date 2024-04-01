export default {
  "**/*.(ts|tsx)": () => "pnpm tsc --noEmit",

  "**/*.(ts|tsx|js)": filenames => {
    const filteredFilenames = filenames.filter(
      name => !/cy\.(ts|js)$/.test(name)
    );
    return [
      `pnpm eslint --fix ${filteredFilenames.join(" ")}`,
      `pnpm prettier --write ${filteredFilenames.join(" ")}`,
    ];
  },

  "**/*.(md|json)": filenames => `pnpm prettier --write ${filenames.join(" ")}`,
};
