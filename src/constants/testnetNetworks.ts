import { NETWORK_NAME } from "./networkName";

export const TESTNET_NETWORKS = Object.freeze({
  [NETWORK_NAME.ETHEREUM]: {
    GOERLI: "GOERLI",
    SEPOLIA: "SEPOLIA",
  },
  [NETWORK_NAME.POLYGON]: {
    MUMBAI: "MUMBAI",
  },
} as const);

export type TestnetNetworks<T extends NETWORK_NAME> =
  (typeof TESTNET_NETWORKS)[T][keyof (typeof TESTNET_NETWORKS)[T]];

export const defaultTestnetNetwork = Object.freeze({
  [NETWORK_NAME.ETHEREUM]: TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA,
  [NETWORK_NAME.POLYGON]: TESTNET_NETWORKS[NETWORK_NAME.POLYGON].MUMBAI,
} as const);
