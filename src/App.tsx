import { MetamaskIcon } from "@components/icons";
import { Container } from "@components/layouts/Container";
import { MainLayout } from "@components/layouts/MainLayout";
import { HomeView } from "@components/tabs/Home";
import { ConnectWalletView } from "@components/views/ConnectView";
import { useMetamask } from "@hooks/useMetamask";
import { PriceProvider } from "@providers/PriceProvider";
import { useWalletStore } from "@store";
import { ProgressSpinner } from "primereact/progressspinner";

const MetamaskSupported = () => {
  const { address } = useWalletStore(state => state.wallet);
  const { loading } = useMetamask();

  return loading ? (
    <Container className="flex min-h-full w-full flex-1 items-center justify-end">
      <ProgressSpinner />
    </Container>
  ) : address ? (
    <PriceProvider>
      <HomeView />
    </PriceProvider>
  ) : (
    <ConnectWalletView />
  );
};

function App() {
  const { metamaskSupported } = useWalletStore(state => state.wallet);
  return (
    <MainLayout>
      {!metamaskSupported ? (
        <Container className="flex min-h-full w-full flex-1 place-content-center items-center justify-center">
          <div className="flex flex-col gap-2 p-3">
            <MetamaskIcon className="mx-auto size-52 max-w-full" />
            <h1 className="text-center text-2xl font-semibold text-orange-500">
              Metamask not supported
            </h1>
            <p className="text-contrast text-lg font-semibold">
              This dapp only works with Metamask, please install it on your
              browser to continue.
            </p>
          </div>
        </Container>
      ) : (
        <MetamaskSupported />
      )}
    </MainLayout>
  );
}

export default App;
