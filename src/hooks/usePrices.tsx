import { CRYPTO_UNITS } from "@constants/unit";
import { Currency } from "@services/prices";
import { useWalletStore } from "@store";
import { usePriceStore } from "@store/prices";
import { useEffect, useMemo } from "react";

interface Input {
  secondsTimeToRefresh?: number;
  currency?: Currency;
}
export const usePrices = ({
  currency = "usd",
  secondsTimeToRefresh = 10,
}: Input | undefined = {}) => {
  const { getPrices, prices } = usePriceStore();
  const wallet = useWalletStore(state => state.wallet);

  const balanceWithPrices = useMemo(() => {
    return wallet.balance.map(token => {
      const price = prices.prices[token.symbol.toUpperCase() as CRYPTO_UNITS];
      return {
        ...token,
        price: price.price,
        value: Number(token.balance) * price.price,
        currency: "USD",
        percentage24h: price.percentage24h,
      };
    });
  }, [prices, wallet.balance]);

  const totalAmount = balanceWithPrices.reduce(
    (acc, token) => acc + token.value,
    0
  );
  useEffect(() => {
    const milliseconds = secondsTimeToRefresh * 1000;
    const interval = window.setInterval(() => {
      getPrices(currency);
    }, milliseconds);
    return () => window.clearInterval(interval);
  }, [getPrices, currency, secondsTimeToRefresh]);

  return {
    prices,
    wallet: { ...wallet, balance: balanceWithPrices },
    totalAmount,
  };
};

export type CalculatedPortfolio = ReturnType<typeof usePrices>;
