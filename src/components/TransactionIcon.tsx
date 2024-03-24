import { FC } from "react";
import { CryptoIcon } from "./icons/CryptoIcon";

interface Props {
  symbol: string;
  receive: boolean;
}
export const TransactionTableIcon: FC<Props> = ({ symbol, receive }) => {
  return (
    <div className="relative w-7 h-7 rounded-full flex items-center justify-center bg-slate-200 border border-slate-500">
      <CryptoIcon
        symbol={symbol}
        className="z-0 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
      />
      <i
        className={`text-slate-500 text-xs pi ${receive ? "pi-arrow-down-left" : "pi-arrow-up-right z-10"}`}
      />
    </div>
  );
};
