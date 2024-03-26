import { BLOCKCHAIN_ENVIRONMENT } from "./blockchainEnvironment";
import { NETWORK_NAME } from "./networkName";
import { defaultTestnetNetwork, TESTNET_NETWORKS } from "./testnetNetworks";

export const chainId = Object.freeze({
  [BLOCKCHAIN_ENVIRONMENT.TESTNET]: {
    [NETWORK_NAME.ETHEREUM]: {
      [TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].GOERLI]: 5,
      [TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA]: 11155111,
    },
    [NETWORK_NAME.POLYGON]: {
      [TESTNET_NETWORKS[NETWORK_NAME.POLYGON].MUMBAI]: 80001,
    },
  },
  [BLOCKCHAIN_ENVIRONMENT.MAINNET]: {
    [NETWORK_NAME.ETHEREUM]: 1,
    [NETWORK_NAME.POLYGON]: 137,
  },
} as const);

export const defaultTestChainId = Object.freeze({
  [NETWORK_NAME.ETHEREUM]:
    chainId[BLOCKCHAIN_ENVIRONMENT.TESTNET][NETWORK_NAME.ETHEREUM][
      defaultTestnetNetwork[NETWORK_NAME.ETHEREUM]
    ],
  [NETWORK_NAME.POLYGON]:
    chainId[BLOCKCHAIN_ENVIRONMENT.TESTNET][NETWORK_NAME.POLYGON][
      defaultTestnetNetwork[NETWORK_NAME.POLYGON]
    ],
} as const);
