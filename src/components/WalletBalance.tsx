import { FC } from "react";

interface WalletBalanceProps {
  balance: string;
}
export const WalletBalance: FC<WalletBalanceProps> = ({ balance }) => {
  return <p className="font-semibold text-4xl">{balance}</p>;
};
