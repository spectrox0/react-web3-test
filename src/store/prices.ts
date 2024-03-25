import { CRYPTO_UNITS } from "@constants/unit";
import { Currency, getPrices } from "@services/prices";
import { create } from "zustand";
import { useWalletStore } from "./wallet";

interface Price {
  symbol: CRYPTO_UNITS;
  price: number;
  percentage24h: number;
}
export interface StatePrices {
  prices: Record<CRYPTO_UNITS, Price>;
  isLoading: boolean;
}
const initialState: StatePrices = {
  prices: {} as Record<CRYPTO_UNITS, Price>,
  isLoading: false,
};
interface PriceStoreState {
  getPrices: (currency?: Currency) => void;
  prices: StatePrices;
}
export const usePriceStore = create<PriceStoreState>(set => ({
  prices: initialState,
  getPrices: async currency => {
    set(state => ({ prices: { ...state.prices, isLoading: true } }));
    try {
      // Get the token symbols from the wallet store state to only fetch the prices of the tokens in the wallet
      const tokenInBalance = useWalletStore
        .getState()
        .wallet.balance.map(token => token.symbol);
      const prices = await getPrices({ keys: tokenInBalance, currency });
      set(state => ({
        prices: {
          ...state.prices,
          prices: prices.reduce(
            (acc, { unit, value, percentage }) => {
              acc[unit] = {
                symbol: unit,
                price: value,
                percentage24h: percentage,
              };
              return acc;
            },
            {} as Record<CRYPTO_UNITS, Price>
          ),
          isLoading: false,
        },
      }));
    } catch (error) {
      set(state => ({ prices: { ...state.prices, isLoading: false } }));
    }
  },
}));
