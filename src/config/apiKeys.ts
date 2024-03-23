import zod from "zod";

const apiKeys = {
  alchemy: import.meta.env.VITE_ALCHEMY_API_KEY,
};

const ApiKeysSchema = zod.object({
  alchemy: zod.string().readonly(),
});
export type ApiKeys = zod.infer<typeof ApiKeysSchema>;

export const API_KEYS = Object.freeze(ApiKeysSchema.parse(apiKeys));
