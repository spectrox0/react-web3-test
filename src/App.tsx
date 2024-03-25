import { Container } from "@components/layouts/Container";
import { MainLayout } from "@components/layouts/MainLayout";
import { HomeView } from "@components/tabs/Home";
import { ConnectWalletView } from "@components/views/ConnectView";
import { useMetamask } from "@hooks/useMetamask";
import { PriceProvider } from "@providers/PriceProvider";
import { useWalletStore } from "@store";
import { ProgressSpinner } from "primereact/progressspinner";

function App() {
  const { address } = useWalletStore(state => state.wallet);
  const { loading } = useMetamask();
  return (
    <MainLayout>
      {loading ? (
        <Container className="flex min-h-full w-full flex-1 items-center justify-end">
          <ProgressSpinner />
        </Container>
      ) : address ? (
        <PriceProvider>
          <HomeView />
        </PriceProvider>
      ) : (
        <ConnectWalletView />
      )}
    </MainLayout>
  );
}

export default App;
