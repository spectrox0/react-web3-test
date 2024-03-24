import { truncateAddr } from "@utils/truncateAddr";
import { FC } from "react";
import { ClipboardCopyBtn } from "./buttons/CopyClipboardBtn";

interface WalletAddressProps {
  address: string;
}
export const WalletAddress: FC<WalletAddressProps> = ({ address }) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="font-semibold text-xl">{truncateAddr(address)}</p>
      <ClipboardCopyBtn text={address} />
    </div>
  );
};
