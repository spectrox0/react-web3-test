import { MetamaskIcon } from "@components/icons";
import { Icon } from "@types";
import { NETWORK_NAME } from "./networkName";

export const enum EXTERNAL_METHODS {
  "METAMASK" = "METAMASK",
}
export const supportMetamask =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  typeof window !== "undefined" && globalThis?.ethereum?.isMetaMask;

export const ExternalMethods = Object.freeze({
  [NETWORK_NAME.POLYGON]: supportMetamask ? [EXTERNAL_METHODS.METAMASK] : [],
} as const);

export type BlockchainByMethod = {
  readonly [EXTERNAL_METHODS.METAMASK]:
    | NETWORK_NAME.ETHEREUM
    | NETWORK_NAME.POLYGON;
};
export const IconMethods = Object.freeze({
  [EXTERNAL_METHODS.METAMASK]: MetamaskIcon,
} satisfies Record<EXTERNAL_METHODS, Icon>);

export const MethodsName = Object.freeze({
  [EXTERNAL_METHODS.METAMASK]: "Metamask / Web3 Browser",
} satisfies Record<EXTERNAL_METHODS, string>);

export { NETWORK_NAME };
