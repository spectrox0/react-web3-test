import { FC } from "react";

interface WalletBalanceProps {
  balance: string;
  id?: string;
}
export const WalletBalance: FC<WalletBalanceProps> = ({
  balance,
  id = "wallet-balance",
}) => {
  return (
    <p className="text-4xl font-semibold" id={id}>
      {balance}
    </p>
  );
};
