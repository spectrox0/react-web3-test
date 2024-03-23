import { FC, useState } from "react";
import { HiddenEyeBtn } from "./buttons/HiddenBtn";

interface WalletBalanceProps {
  balance: string;
}
export const WalletBalance: FC<WalletBalanceProps> = ({ balance }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const text = hidden ? "******" : balance;
  return (
    <div className="flex items-center gap-2">
      <p className="text-white font-semibold text-lg">{text}</p>
      <HiddenEyeBtn hidden={hidden} onClick={setHidden} />
    </div>
  );
};
