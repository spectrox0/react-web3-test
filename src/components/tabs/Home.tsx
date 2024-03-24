import { HiddenEyeBtn } from "@components/buttons/HiddenBtn";
import { SendTokenBtn } from "@components/buttons/SendToken";
import { Box } from "@components/layouts/Box";
import { Container } from "@components/layouts/Container";
import { WalletAddress } from "@components/WalletAddress";
import { WalletBalance } from "@components/WalletBalance";
import { usePrices } from "@hooks/usePrices";
import { formatCurrency } from "@utils";
import { FC, useState } from "react";
import { MainMenuTabs } from "./MainMenuTabs";

export const HomeView: FC = () => {
  const { totalAmount, wallet } = usePrices();
  const [hidden, setHidden] = useState<boolean>(true);
  const balance = formatCurrency(totalAmount, "currency", "USD");
  const text = hidden ? "******" : balance;
  return (
    <Container className="py-4 flex flex-col gap-4">
      <div>
        <div className="flex gap-2 items-center">
          <h4 className="text-md">Valor de la cartera</h4>
          <HiddenEyeBtn hidden={hidden} onClick={setHidden} />
        </div>
        <WalletBalance balance={text} />
      </div>
      <div className="flex flex-wrap gap-2 justify-between">
        <Box className="self-start px-4 py-2 w-auto inline-flex">
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
