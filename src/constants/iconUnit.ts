import {
  ADAIcon,
  BitcoinIcon,
  BNBIcon,
  EthereumIcon,
  PolygonIcon,
  SolanaIcon,
  UsdcIcon,
  UsdtIcon,
} from "@components/icons";
import { CRYPTO_UNITS } from "./unit";

export const IconUnit = Object.freeze({
  [CRYPTO_UNITS.ETH]: EthereumIcon,
  [CRYPTO_UNITS.WETH]: EthereumIcon,
  [CRYPTO_UNITS.WBTC]: BitcoinIcon,
  [CRYPTO_UNITS.MATIC]: PolygonIcon,
  [CRYPTO_UNITS.USDC]: UsdcIcon,
  [CRYPTO_UNITS.USDT]: UsdtIcon,
  [CRYPTO_UNITS.ADA]: ADAIcon,
  [CRYPTO_UNITS.BNB]: BNBIcon,
  [CRYPTO_UNITS.BTC]: BitcoinIcon,
  [CRYPTO_UNITS.SOL]: SolanaIcon,
} as const);

export const getIconUnit = (unit: CRYPTO_UNITS) =>
  IconUnit[unit] || EthereumIcon;
