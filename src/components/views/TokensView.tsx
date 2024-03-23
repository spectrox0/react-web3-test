import { PortfolioTable } from "@components/datatables/Portfolio";
import { FCC } from "@types";

export const TokenViews: FCC = () => {
  return (
    <div>
      <h1>Tokens</h1>
      <PortfolioTable />
    </div>
  );
};
