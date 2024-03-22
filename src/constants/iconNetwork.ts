import { EthereumIcon, PolygonIcon } from "@components/icons";
import { Icon } from "@types";
import { NETWORK_NAME } from "./networkName";

export const IconNetwork: Record<NETWORK_NAME, Icon> = Object.freeze({
  [NETWORK_NAME.ETHEREUM]: EthereumIcon,
  [NETWORK_NAME.POLYGON]: PolygonIcon,
} as const);
