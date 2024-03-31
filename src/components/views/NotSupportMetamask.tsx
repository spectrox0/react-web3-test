import { MetamaskIcon } from "@components/icons";
import { Container } from "@components/layouts/Container";
import { FC } from "react";

export const NotSupportMetamask: FC = () => {
  return (
    <Container className="flex min-h-full w-full flex-1 items-center justify-center">
      <div className="flex flex-col gap-2 p-3">
        <MetamaskIcon className="mx-auto h-auto w-52 max-w-full" />
        <span className="border-red mx-auto self-center rounded-md border-2 border-red-600 bg-red-600/5 px-4 py-3 text-4xl font-bold uppercase tracking-wider text-red-600">
          Error
        </span>
        <h1 className="text-center text-2xl font-semibold text-orange-500">
          Metamask not supported
        </h1>
        <p className="text-contrast text-lg font-semibold">
          This dapp only works with Metamask, please install it on your browser
          to continue.
        </p>
      </div>
    </Container>
  );
};
