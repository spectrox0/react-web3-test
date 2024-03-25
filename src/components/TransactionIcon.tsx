import { FC } from "react";
import { CryptoIcon } from "./icons/CryptoIcon";

interface Props {
  symbol: string;
  receive: boolean;
}
export const TransactionTableIcon: FC<Props> = ({ symbol, receive }) => {
  return (
    <div className="relative flex size-7 items-center justify-center rounded-full border border-slate-500 bg-slate-200">
      <CryptoIcon
        symbol={symbol}
        className="absolute left-0 top-0 z-0 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <i
        className={`pi z-10 text-xs text-slate-500 ${receive ? "pi-arrow-down-left" : "pi-arrow-up-right "}`}
      />
    </div>
  );
};
