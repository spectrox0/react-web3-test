import { MetamaskIcon } from "@components/icons";
import { useWalletStore } from "@store/wallet";
import { FC } from "react";
import { MethodBtn } from "./MethodBtn";

interface Props {
  className?: string;
}
export const MetamaskBtn: FC<Props> = ({ className }) => {
  const { connectViaMetamask } = useWalletStore();
  return (
    <MethodBtn
      color="metamask"
      id="connect-metamask"
      className={`${className}  border font-bold`}
      Icon={MetamaskIcon}
      onClick={connectViaMetamask}
    >
      Connect to MetaMask
    </MethodBtn>
  );
};
