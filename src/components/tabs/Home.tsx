import { Container } from "@components/layouts/Container";
import { WalletAddress } from "@components/WalletAddress";
import { WalletBalance } from "@components/WalletBalance";
import { usePrices } from "@hooks/usePrices";
import { FC } from "react";
import { MainMenuTabs } from "./MainMenuTabs";

export const HomeView: FC = () => {
  const { totalAmount, wallet } = usePrices();
  return (
    <Container>
      <h1>Welcome</h1>
      <WalletBalance balance={totalAmount.toFixed(2)} />
      <WalletAddress address={wallet.address as string} />

      <MainMenuTabs />
    </Container>
  );
};
