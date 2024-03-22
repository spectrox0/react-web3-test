import { BLOCKCHAIN_ENVIRONMENT } from "./blockchainEnvironment";
import { defaultTestnetNetwork, testnetNetworks } from "./chainIds";
import { NETWORK_NAME } from "./networkName";
import { CRYPTO_UNITS } from "./unit";

export const contractAddress = Object.freeze({
  [BLOCKCHAIN_ENVIRONMENT.TESTNET]: {
    [NETWORK_NAME.ETHEREUM]: {
      [testnetNetworks[NETWORK_NAME.ETHEREUM].GOERLI]: {
        [CRYPTO_UNITS.USDC]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      },
      [testnetNetworks[NETWORK_NAME.ETHEREUM].SEPOLIA]: {
        [CRYPTO_UNITS.USDC]: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        [CRYPTO_UNITS.USDT]: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
      },
    },

    [NETWORK_NAME.POLYGON]: {
      [testnetNetworks[NETWORK_NAME.POLYGON].MUMBAI]: {
        [CRYPTO_UNITS.USDC]: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
        [CRYPTO_UNITS.MATIC]: "0x9c3c9283d3e44854697cd22d3faa240cfb032889",
      },
    },
  },
  [BLOCKCHAIN_ENVIRONMENT.MAINNET]: {
    [NETWORK_NAME.POLYGON]: {
      [CRYPTO_UNITS.USDC]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      [CRYPTO_UNITS.MATIC]: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    },
    [NETWORK_NAME.ETHEREUM]: {
      [CRYPTO_UNITS.USDC]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      [CRYPTO_UNITS.MATIC]: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    },
  },
} as const);

export const defaultTestnetContractAddress = {
  [NETWORK_NAME.ETHEREUM]: {
    [CRYPTO_UNITS.USDC]:
      contractAddress[BLOCKCHAIN_ENVIRONMENT.TESTNET][NETWORK_NAME.ETHEREUM][
        defaultTestnetNetwork[NETWORK_NAME.ETHEREUM]
      ][CRYPTO_UNITS.USDC],
  },
  [NETWORK_NAME.POLYGON]: {
    [CRYPTO_UNITS.MATIC]:
      contractAddress[BLOCKCHAIN_ENVIRONMENT.TESTNET][NETWORK_NAME.POLYGON][
        defaultTestnetNetwork[NETWORK_NAME.POLYGON]
      ][CRYPTO_UNITS.MATIC],
  },
} as const;