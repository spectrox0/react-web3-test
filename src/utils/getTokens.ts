import { NETWORK_NAME } from "@constants";
import axios from "axios";
import localForage from "localforage";
enum ListedIn {
  CoinGecko = "coingecko",
  OneInch = "1inch",
  LiFinance = "lifinance",
  SushiSwap = "sushiswap",
  OpenOcean = "openocean",
  Uniswap = "uniswap",
  Rubic = "rubic",
  XyFinance = "xyfinance",
  ElkFinance = "elkfinance",
  ArbitrumBridge = "arbitrum_bridge",
}

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  coingeckoId: string | null; // `null`  to token without id in coingecko.
  listedIn: ListedIn[];
}

const TOKEN_LISTS = Object.freeze({
  [NETWORK_NAME.ETHEREUM]:
    "https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/ethereum.json",
  //   Avalanche:
  //     "https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/avax.json",
  //   Binance:
  //     "https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/bsc.json",
  [NETWORK_NAME.POLYGON]:
    "https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/polygon.json",
} as const);
/**
 * @param chain string with the protocol name. eg ETHEREUM
 */
export const getTokens = async (
  chain: NETWORK_NAME = NETWORK_NAME.ETHEREUM
) => {
  // get token list file URL by chain
  const chainTokens = await localForage.getItem<Token[]>(`tokens[${chain}]`);
  if (chainTokens) {
    return chainTokens;
  }
  const tokenSource = TOKEN_LISTS[chain];
  // retrieve token list from URL
  return axios.get<Token[]>(tokenSource).then(res => {
    const tokens = res.data;
    localForage.setItem(`tokens[${chain}]`, tokens);
    return tokens;
  });
};
