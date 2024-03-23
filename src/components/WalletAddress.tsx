import { FC } from "react";
import { CopyClipboardBtn } from "./buttons/CopyClipboardBtn";

interface WalletAddressProps {
  address: string;
}
export const WalletAddress: FC<WalletAddressProps> = ({ address }) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-white font-semibold text-lg">{address}</p>
      <CopyClipboardBtn text={address} />
    </div>
  );
};
