import { CRYPTO_UNITS } from "@constants/unit";
import { Currency, getPrices } from "@services/prices";
import { create } from "zustand";

interface Price {
  symbol: CRYPTO_UNITS;
  price: number;
  percentage24h: number;
}
interface StatePrices {
  prices: Record<CRYPTO_UNITS, Price>;
  isLoading: boolean;
}
const initialState: StatePrices = {
  prices: Object.values(CRYPTO_UNITS).reduce(
    (acc, symbol) => {
      acc[symbol] = {
        symbol,
        price: 0,
        percentage24h: 0,
      };
      return acc;
    },
    {} as Record<CRYPTO_UNITS, Price>
  ),
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
      const prices = await getPrices({
        keys: Object.values(CRYPTO_UNITS),
        percentage: true,
        currency,
      });
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
