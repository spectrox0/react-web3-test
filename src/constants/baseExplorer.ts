import { BLOCKCHAIN_ENVIRONMENT } from "./blockchainEnvironment";
import { NETWORK_NAME } from "./networkName";
import { TESTNET_NETWORKS } from "./testnetNetworks";

export enum EXPLORER_CATEGORY {
  "TRANSACTION" = "TRANSACTION",
  "ADDRESS" = "ADDRESS",
}

// This is the base URL for the explorer of each network
// Avoid magic strings
export const EXPLORER_BASE_URL = Object.freeze({
  [NETWORK_NAME.ETHEREUM]: {
    [BLOCKCHAIN_ENVIRONMENT.MAINNET]: {
      [EXPLORER_CATEGORY.TRANSACTION]: "https://etherscan.io/tx/" as const,
      [EXPLORER_CATEGORY.ADDRESS]: "https://etherscan.io/address/" as const,
    },
    [BLOCKCHAIN_ENVIRONMENT.TESTNET]: {
      [TESTNET_NETWORKS.ETHEREUM.GOERLI]: {
        [EXPLORER_CATEGORY.TRANSACTION]:
          "https://goerli.etherscan.io/tx/" as const,
        [EXPLORER_CATEGORY.ADDRESS]:
          "https://goerli.etherscan.io/address/" as const,
      },
      [TESTNET_NETWORKS.ETHEREUM.SEPOLIA]: {
        [EXPLORER_CATEGORY.TRANSACTION]:
          "https://sepolia.etherscan.io/tx" as const,
        [EXPLORER_CATEGORY.ADDRESS]:
          "https://sepolia.etherscan.io/address/" as const,
      },
    },
  },

  [NETWORK_NAME.POLYGON]: {
    [BLOCKCHAIN_ENVIRONMENT.TESTNET]: {
      [EXPLORER_CATEGORY.TRANSACTION]:
        "https://mumbai.polygonscan.com/tx/" as const,
      [EXPLORER_CATEGORY.ADDRESS]:
        "https://mumbai.polygonscan.com/address/" as const,
    },
    [BLOCKCHAIN_ENVIRONMENT.MAINNET]: {
      [EXPLORER_CATEGORY.TRANSACTION]: "https://polygonscan.com/tx/" as const,
      [EXPLORER_CATEGORY.ADDRESS]: "https://polygonscan.com/address/" as const,
    },
  },
});
