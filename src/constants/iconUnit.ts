import { EthereumIcon, PolygonIcon, UsdcIcon } from "@components/icons";
import { CRYPTO_UNITS } from "./unit";

export const IconUnit = Object.freeze({
  [CRYPTO_UNITS.ETH]: EthereumIcon,
  [CRYPTO_UNITS.MATIC]: PolygonIcon,
  [CRYPTO_UNITS.USDC]: UsdcIcon,
  [CRYPTO_UNITS.USDT]: UsdcIcon,
} as const);
