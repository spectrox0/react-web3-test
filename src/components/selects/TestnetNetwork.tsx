import { BLOCKCHAIN_ENVIRONMENT } from "@constants";
import {
  TESTNET_NETWORKS,
  TESTNET_NETWORKS_ETHEREUM,
  TESTNET_NETWORKS_POLYGON,
} from "@constants/testnetNetworks";
import { useWalletStore } from "@store";
import { showAlert, showSuccess } from "@utils";
import { DropdownChangeEvent } from "primereact/dropdown";
import { FC } from "react";
import { CustomSelect } from "./Select";

type TestnetNetworks =
  | typeof TESTNET_NETWORKS_ETHEREUM
  | typeof TESTNET_NETWORKS_POLYGON;
type TestnetNetworkValue = TestnetNetworks[keyof TestnetNetworks];

export const TestnetNetworkSelect: FC = () => {
  const {
    wallet: { networkEnvironment, network },
  } = useWalletStore();
  const showNetwork =
    networkEnvironment?.environment === BLOCKCHAIN_ENVIRONMENT.TESTNET;
  const testnetNetworks = Object.values(TESTNET_NETWORKS[network]);

  const isTestnetNetwork = (value: string): value is TestnetNetworkValue =>
    Boolean(TESTNET_NETWORKS[network as keyof TestnetNetworks][value]);

  const onChangeTestnetNetwork = async (e: DropdownChangeEvent) => {
    if (typeof e.value !== "string" || !isTestnetNetwork(e.value)) {
      showAlert("Invalid testnet network");
      return;
    }
    // Promise to change network
    // code here

    showSuccess("Network changed successfully");
  };
  return showNetwork ? (
    <CustomSelect
      disabled={true}
      value={networkEnvironment.testnetNetwork}
      options={testnetNetworks}
      onChange={onChangeTestnetNetwork}
    />
  ) : null;
};
