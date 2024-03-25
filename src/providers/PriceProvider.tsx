import { CRYPTO_UNITS } from "@constants/unit";
import { useWalletStore, WalletState } from "@store";
import { StatePrices, usePriceStore } from "@store/prices";
import { FCC } from "@types";
import { createContext, useEffect, useMemo, useRef } from "react";

const currency = "usd";
const secondsTimeToRefresh = 240;
interface PriceContextProps {
  prices: StatePrices;
  wallet: WalletState & {
    balanceWithPrices: WalletState["balance"] &
      {
        value: number;
        price: number;
        percentage24h: number;
        currency: string;
      }[];
  };
  totalAmount: number;
  intervalRef: React.MutableRefObject<number | null>;
}

export const PriceContext = createContext<PriceContextProps>(
  {} as PriceContextProps
);
export const PriceProvider: FCC = ({ children }) => {
  const { getPrices, prices } = usePriceStore(state => state);
  const wallet = useWalletStore(state => state.wallet);
  const intervalRef = useRef<number | null>(null);

  const balanceWithPrices = useMemo(() => {
    return wallet.balance.map(token => {
      const price =
        prices.prices[token.symbol.toUpperCase() as CRYPTO_UNITS] || {};
      return {
        ...token,
        price: price?.price || 0,
        value: Number(token.balance) * (price?.price ?? 1),
        currency,
        percentage24h: price?.percentage24h ?? 0,
      };
    });
  }, [prices.prices, wallet.balance]);

  const totalAmount = balanceWithPrices.reduce(
    (acc, token) => acc + token.value,
    0
  );
  useEffect(() => {
    getPrices(currency);
    const milliseconds = secondsTimeToRefresh * 1000;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      getPrices(currency);
    }, milliseconds);
    return () => {
      intervalRef.current && window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<PriceContextProps>(
    () => ({
      prices,
      intervalRef,
      wallet: { ...wallet, balanceWithPrices },
      totalAmount,
    }),
    [prices, intervalRef, wallet, balanceWithPrices, totalAmount]
  );
  return (
    <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
  );
};
