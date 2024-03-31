export default {
  "**/*.(ts|tsx)": () => "pnpm tsc --noEmit",

  "**/*.(ts|tsx|js)": filenames => {
    const filteredFilenames = filenames.filter(
      name =>
        !/cy\.(ts|js|tsx)$/.test(name) &&
        !name.includes("node_modules/@synthetixio/synpress")
    );

    return [
      `pnpm eslint --fix ${filteredFilenames.join(" ")}`,
      `pnpm prettier --write ${filteredFilenames.join(" ")}`,
    ];
  },

  "**/*.(md|json)": filenames => `pnpm prettier --write ${filenames.join(" ")}`,
};
