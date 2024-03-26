import { FC } from "react";

interface WalletBalanceProps {
  balance: string;
}
export const WalletBalance: FC<WalletBalanceProps> = ({ balance }) => {
  return <p className="text-4xl font-semibold">{balance}</p>;
};
