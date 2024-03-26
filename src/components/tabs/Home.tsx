import { HiddenEyeBtn } from "@components/buttons/HiddenBtn";
import { SendTokenBtn } from "@components/buttons/SendToken";
import { Box } from "@components/layouts/Box";
import { Container } from "@components/layouts/Container";
import { WalletAddress } from "@components/WalletAddress";
import { WalletBalance } from "@components/WalletBalance";
import { usePrices } from "@hooks/usePrices";
import { useWalletStore } from "@store";
import { formatCurrency } from "@utils";
import { FC, useEffect, useState } from "react";
import { MainMenuTabs } from "./MainMenuTabs";

export const HomeView: FC = () => {
  const { totalAmount, wallet } = usePrices();
  const [hidden, setHidden] = useState<boolean>(true);
  const balance = formatCurrency(totalAmount, "currency", "USD");
  const text = hidden ? "******" : balance;
  const { onSubscribeContractTransfer, unSubscribeContractTransfer } =
    useWalletStore(state => state);
  useEffect(() => {
    onSubscribeContractTransfer();
    return unSubscribeContractTransfer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="flex flex-col gap-4 py-4">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-md">Valor de la cartera</h4>
          <HiddenEyeBtn hidden={hidden} onClick={setHidden} />
        </div>
        <WalletBalance balance={text} />
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <Box className="inline-flex w-auto self-start px-4 py-2">
          <WalletAddress address={wallet.address as string} />
        </Box>
        <SendTokenBtn />
      </div>
      <Box>
        <MainMenuTabs />
      </Box>
    </Container>
  );
};
