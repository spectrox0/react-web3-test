import { MainLayout } from "@components/layouts/MainLayout";
import { HomeView } from "@components/tabs/Home";
import { ConnectWalletView } from "@components/views/ConnectView";
import { PriceProvider } from "@providers/PriceProvider";
import { useWalletStore } from "@store";

function App() {
  const address = useWalletStore(state => state.wallet.address);
  return (
    <MainLayout>
      {address ? (
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
