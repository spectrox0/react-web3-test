import { MetamaskBtn } from "@components/buttons/MetamaskBtn";
import { Container } from "@components/layouts/Container";
import { FCC } from "@types";

// View to connect your wallet in this case with metamask
export const ConnectWalletView: FCC = () => {
  return (
    <Container className="flex flex-col gap-3 flex-1 place-items-center py-2 items-center justify-center">
      <h1 className="text-lg text-zinc-200"> Connect Wallet 👇 </h1>
      <MetamaskBtn className="max-w-56 mx-auto" />
    </Container>
  );
};
