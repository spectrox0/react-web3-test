import { NETWORK_NAME } from "./networkName";
import { CRYPTO_UNITS } from "./unit";

export const AVAILABLE_TOKEN = Object.freeze({
  [NETWORK_NAME.ETHEREUM]: [
    CRYPTO_UNITS.USDC,
    CRYPTO_UNITS.ETH,
    CRYPTO_UNITS.USDT,
    CRYPTO_UNITS.MATIC,
  ],
  [NETWORK_NAME.POLYGON]: [
    CRYPTO_UNITS.USDC,
    CRYPTO_UNITS.MATIC,
    CRYPTO_UNITS.USDT,
  ],
} as const);

export type AvailableToken<T extends keyof typeof AVAILABLE_TOKEN> =
  (typeof AVAILABLE_TOKEN)[T][number];
