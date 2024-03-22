import { NETWORK_NAME } from "./networkName";

export const paymentMethodsDecimals = Object.freeze({
  [NETWORK_NAME.ETHEREUM]: 8,
  [NETWORK_NAME.POLYGON]: 4,
} as const);

export const paymentMethodsConfirmations = Object.freeze({
  [NETWORK_NAME.ETHEREUM]: 12,
  [NETWORK_NAME.POLYGON]: 100,
} as const);
