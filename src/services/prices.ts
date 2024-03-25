import { API_KEYS } from "@config";
import { NETWORK_NAME } from "@constants";
import { CRYPTO_UNITS } from "@constants/unit";
import { getTokens } from "@utils/getTokens";
import axios from "axios";
import { CryptoCurrencyResponse } from "./price.type";

type ValueOf<T> = T[keyof T];

export type Entries<T> = [keyof T, ValueOf<T>][];
const client = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  headers: {
    "X-CoinAPI-Key": API_KEYS.coinGecko,
  },
});
const CRYPTO_IDS = {
  [CRYPTO_UNITS.USDC]: "usd-coin",
  [CRYPTO_UNITS.MATIC]: "matic-network",
  [CRYPTO_UNITS.ETH]: "ethereum",
  [CRYPTO_UNITS.WETH]: "weth",
  [CRYPTO_UNITS.USDT]: "tether",
  [CRYPTO_UNITS.ADA]: "cardano",
  [CRYPTO_UNITS.BNB]: "binancecoin",
  [CRYPTO_UNITS.BTC]: "bitcoin",
  [CRYPTO_UNITS.SOL]: "solana",
  [CRYPTO_UNITS.ALGO]: "algorand",
  [CRYPTO_UNITS.WBTC]: "wrapped-bitcoin",
} as const satisfies Record<CRYPTO_UNITS, string>;

export type Currency = "usd" | "eur";
type DataResponse = {
  usd?: number;
  eur?: number;
  usd_24h_change?: number;
  eur_24h_change?: number;
};
type Response = Record<(typeof CRYPTO_IDS)[CRYPTO_UNITS], DataResponse>;
export const getLists = async (currency = "usd") => {
  return (
    (
      await client.get<CryptoCurrencyResponse[]>(
        `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h`
      )
    ).data || []
  );
};

export const getCoinGeckoIdBySymbols = async (
  symbol: string[],
  currency?: Currency
): Promise<{ unit: CRYPTO_UNITS; value: number; percentage: number }[]> => {
  const list = await getLists(currency);
  if (!Array.isArray(list)) return [];
  return list
    .filter(a => symbol.some(b => b.toLowerCase() === a.symbol))
    .map(({ symbol, current_price, price_change_percentage_24h }) => ({
      unit: symbol.toUpperCase() as CRYPTO_UNITS,
      value: current_price,
      percentage: price_change_percentage_24h / 100,
    }));
};

export const getPrices = async ({
  keys,
  percentage = true,
  currency = "usd",
}: {
  keys: (CRYPTO_UNITS | string)[];
  percentage?: boolean;
  currency?: Currency;
}): Promise<{ unit: CRYPTO_UNITS; value: number; percentage: number }[]> => {
  const idsMap = {
    ...CRYPTO_IDS,
  } as Record<string, string>;
  const keysNotFound = keys.filter(
    key => !CRYPTO_IDS[key.toUpperCase() as CRYPTO_UNITS]
  );
  if (keysNotFound.length) {
    (await getTokens(NETWORK_NAME.ETHEREUM))
      .filter(
        res =>
          res.coingeckoId !== null &&
          keysNotFound.some(key => key === res.symbol.toUpperCase())
      )
      .forEach(res => {
        idsMap[res.symbol.toUpperCase()] = res.coingeckoId as string;
      });
  }
  console.log(idsMap);
  const cryptoIds = keys.map(key => idsMap[key]).join(",");
  const endpoint = `simple/price?ids=${cryptoIds}&vs_currencies=${currency}&include_24hr_change=${percentage}`;
  const res = await client.get<Response>(endpoint).catch(() => undefined);
  if (!res) return [];
  const data = res.data;
  return (Object.entries(data) as Entries<Response>).map(([key, value]) => {
    return {
      unit: Object.entries(idsMap).find(
        ([, value]) => value === key
      )?.[0] as CRYPTO_UNITS,
      value: value[currency as Currency] as number,
      percentage: (value[`${currency}_24h_change`] as number) / 100,
    };
  });
};
