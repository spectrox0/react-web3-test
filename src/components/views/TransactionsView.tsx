import { TransactionHistoryTable } from "@components/datatables";
import { useWalletStore } from "@store";
import { FCC } from "@types";
import { useEffect } from "react";

export const TransactionsView: FCC = () => {
  const getHistoricalData = useWalletStore(state => state.getHistoricalData);
  const { historical, isLoading } = useWalletStore(
    state => state.wallet.historical
  );
  useEffect(() => {
    getHistoricalData();
  }, [getHistoricalData]);

  return (
    <div>
      <TransactionHistoryTable loading={isLoading} historical={historical} />
    </div>
  );
};
