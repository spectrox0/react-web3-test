import { NETWORK_NAME } from "@constants";
import { CRYPTO_UNITS } from "./unit";

export const UnitNetwork = Object.freeze({
  [NETWORK_NAME.ETHEREUM]: CRYPTO_UNITS.ETH,
  [NETWORK_NAME.POLYGON]: CRYPTO_UNITS.MATIC,
} as const satisfies Record<NETWORK_NAME, CRYPTO_UNITS>);
