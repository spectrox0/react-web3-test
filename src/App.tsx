import { Container } from "@components/layouts/Container";
import { MainLayout } from "@components/layouts/MainLayout";
import { HomeView } from "@components/tabs/Home";
import { ConnectWalletView } from "@components/views/ConnectView";
import { PriceProvider } from "@providers/PriceProvider";
import { useWalletStore } from "@store";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";

function App() {
  const { address } = useWalletStore(state => state.wallet);
  const [loading, setLoading] = useState(true);
  const checkInitialConnectionMetamask = useWalletStore(
    state => state.checkInitialConnectionMetamask
  );
  useEffect(() => {
    Promise.all([checkInitialConnectionMetamask()]).then(() =>
      setLoading(false)
    );
  }, [checkInitialConnectionMetamask]);
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
