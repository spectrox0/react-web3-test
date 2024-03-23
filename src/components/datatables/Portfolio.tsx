import { getIconUnit } from "@constants/iconUnit";
import { CRYPTO_UNITS } from "@constants/unit";
import { CalculatedPortfolio, usePrices } from "@hooks/usePrices";
import { formatCurrency } from "@utils/formatCurrency";
import { percentageVariation } from "@utils/percentageVariation";
import { Column, ColumnBodyOptions } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FC, ReactNode } from "react";

type BodyTemplate =
  | ReactNode
  | ((
      data: CalculatedPortfolio["wallet"]["balanceWithPrices"][number],
      options: ColumnBodyOptions
    ) => ReactNode);
export const PortfolioTable: FC = () => {
  const { wallet, totalAmount } = usePrices();

  const tokenTemplate: BodyTemplate = rowData => {
    const Icon = getIconUnit(rowData.symbol as CRYPTO_UNITS);
    return (
      <div className="flex items-center gap-3">
        {Icon && <Icon width={35} height={35} />}
        <div className="flex flex-col gap-1">
          <p className="m-0 p-0 font-bold text-gray-950">{rowData.symbol}</p>
          <p className="m-0 p-0 font-medium text-gray-700">{rowData.name}</p>
        </div>
      </div>
    );
  };

  const balanceTemplate: BodyTemplate = rowData => {
    return (
      <div className="flex flex-col justify-center gap-1">
        <p className="m-0 p-0 font-bold text-gray-950">
          {formatCurrency(rowData.value)}
        </p>
        <p className="m-0 p-0 font-medium text-gray-700">
          {formatCurrency(rowData.balance)} {rowData.symbol}
        </p>
      </div>
    );
  };

  const percentageOfTotalTemplate: BodyTemplate = rowData => {
    const percentage =
      totalAmount > 0 ? ((rowData.value / totalAmount) * 100).toFixed(2) : 0;
    return <p className="font-semibold text-gray-950">%{percentage}</p>;
  };

  const percentageChange24hTemplate: BodyTemplate = rowData => {
    const variation = percentageVariation(rowData.percentage24h);
    return (
      <div className="flex items-center gap-3">
        <p className={`m-0 p-0 font-bold ${variation}`}>
          {rowData.percentage24h > 0 && "+"}
          {rowData.percentage24h}%
        </p>
      </div>
    );
  };
  console.log(wallet);
  return (
    <DataTable
      value={wallet.balanceWithPrices}
      sortMode="multiple"
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column
        header="Token"
        body={tokenTemplate}
        style={{ width: "25%" }}
      ></Column>
      <Column
        field="balance"
        header="Balance"
        sortable
        body={balanceTemplate}
        style={{ width: "25%" }}
      ></Column>
      <Column
        header="Portfolio %"
        body={percentageOfTotalTemplate}
        style={{ width: "25%" }}
      ></Column>
      <Column
        header="Price (24hr)"
        body={percentageChange24hTemplate}
        style={{ width: "25%" }}
      ></Column>
    </DataTable>
  );
};
