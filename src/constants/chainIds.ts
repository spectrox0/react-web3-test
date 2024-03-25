import { API_KEYS } from "@config";
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

export const rpcUrls = Object.freeze({
  [BLOCKCHAIN_ENVIRONMENT.TESTNET]: {
    [NETWORK_NAME.ETHEREUM]: {
      [TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].GOERLI]: [
        "https://ethereum-goerli.publicnode.com",
        "https://endpoints.omniatech.io/v1/eth/goerli/public",
      ],
      [TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA]: [
        `https://eth-sepolia.g.alchemy.com/v2/${API_KEYS.alchemy.ETHEREUM.SEPOLIA}`,
        "https://ethereum-sepolia-rpc.publicnode.com",
        "https://endpoints.omniatech.io/v1/eth/sepolia/public",
      ],
    },
    [NETWORK_NAME.POLYGON]: {
      [TESTNET_NETWORKS[NETWORK_NAME.POLYGON].MUMBAI]: [
        "https://polygon-mumbai-bor.publicnode.com",
        "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      ],
    },
  },
  [BLOCKCHAIN_ENVIRONMENT.MAINNET]: {
    [NETWORK_NAME.ETHEREUM]: [
      `https://eth-mainnet.g.alchemy.com/v2/${API_KEYS.alchemy.ETHEREUM.MAINNET}`,
      "https://ethereum.publicnode.com",
      "https://eth.llamarpc.com",
      "https://rpc.mevblocker.io",
    ],
    [NETWORK_NAME.POLYGON]: [
      "https://polygon.llamarpc.com",
      "https://polygon-bor.publicnode.com",
      "https://1rpc.io/matic",
    ],
  },
} as const);

export const testnetDefaultRpcUrls = Object.freeze({
  [NETWORK_NAME.ETHEREUM]:
    rpcUrls[BLOCKCHAIN_ENVIRONMENT.TESTNET][NETWORK_NAME.ETHEREUM][
      defaultTestnetNetwork[NETWORK_NAME.ETHEREUM]
    ],
  [NETWORK_NAME.POLYGON]:
    rpcUrls[BLOCKCHAIN_ENVIRONMENT.TESTNET][NETWORK_NAME.POLYGON][
      defaultTestnetNetwork[NETWORK_NAME.POLYGON]
    ],
} as const);
