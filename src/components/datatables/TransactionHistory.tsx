import { HistoricalData } from "@store/wallet.types";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FC } from "react";

interface Props {
  historical: HistoricalData[];
}
export const TransactionHistoryTable: FC<Props> = ({ historical }) => {
  return (
    <DataTable
      value={historical}
      sortMode="multiple"
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column header="Operation" style={{ width: "25%" }}></Column>
      <Column header="Address" sortable style={{ width: "25%" }}></Column>
      <Column header="Amount" style={{ width: "25%" }}></Column>
      <Column header="Explorer" style={{ width: "25%" }}></Column>
    </DataTable>
  );
};
