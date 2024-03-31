import { truncateAddr } from "@utils/truncateAddr";
import { FC } from "react";
import { ClipboardCopyBtn } from "./buttons/CopyClipboardBtn";

interface WalletAddressProps {
  address: string;
}
export const WalletAddress: FC<WalletAddressProps> = ({ address }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-xl font-semibold" id="wallet-address">
        {truncateAddr(address)}
      </p>
      <ClipboardCopyBtn text={address} />
    </div>
  );
};
