import { PriceContext } from "@providers/PriceProvider";
import { useContext } from "react";

export const usePrices = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("usePrices must be used within a PriceProvider");
  }
  return context;
};

export type CalculatedPortfolio = ReturnType<typeof usePrices>;
