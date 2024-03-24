import { TransactionHistoryTable } from "@components/datatables";
import { useWalletStore } from "@store";
import { FCC } from "@types";
import { useEffect } from "react";

export const TransactionsView: FCC = () => {
  const getHistoricalData = useWalletStore(state => state.getHistoricalData);
  const historicalData = useWalletStore(
    state => state.wallet.historical.historical
  );
  useEffect(() => {
    getHistoricalData();
  }, [getHistoricalData]);

  return (
    <div>
      <TransactionHistoryTable historical={historicalData} />
    </div>
  );
};
