import { CRYPTO_UNITS } from "@constants/unit";
import axios from "axios";

type ValueOf<T> = T[keyof T];

export type Entries<T> = [keyof T, ValueOf<T>][];
const client = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/simple/",
});
export const CRYPTO_IDS = {
  [CRYPTO_UNITS.USDC]: "usd-coin",
  [CRYPTO_UNITS.MATIC]: "matic-network",
  [CRYPTO_UNITS.ETH]: "ethereum",
  [CRYPTO_UNITS.USDT]: "usdt",
} as const satisfies Record<CRYPTO_UNITS, string>;

type Currency = "usd" | "eur";
type DataResponse = {
  usd?: number;
  eur?: number;
  usd_24h_change?: number;
  eur_24h_change?: number;
};
type Response = Record<(typeof CRYPTO_IDS)[CRYPTO_UNITS], DataResponse>;
export const getPrices = async ({
  keys,
  percentage,
  currency = "usd",
}: {
  keys: CRYPTO_UNITS[];
  percentage: boolean;
  currency: Currency;
}): Promise<{ unit: CRYPTO_UNITS; value: number; percentage: number }[]> => {
  const cryptoIds = keys.map(key => CRYPTO_IDS[key]).join(",");
  const endpoint = `price?ids=${cryptoIds}&vs_currencies=${currency}&include_24hr_change=${percentage}`;
  const { data } = await client.get<Response>(endpoint);

  return (Object.entries(data) as Entries<Response>).map(([key, value]) => {
    return {
      unit: Object.entries(CRYPTO_IDS).find(
        ([, value]) => value === key
      )?.[0] as CRYPTO_UNITS,
      value: value[currency as Currency] as number,
      percentage: value[`${currency}_24h_change`] as number,
    };
  });
};
