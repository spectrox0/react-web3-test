import { BLOCKCHAIN_ENVIRONMENT, NETWORK_NAME } from "@constants";
import { TESTNET_NETWORKS, TestnetNetworks } from "@constants/testnetNetworks";
import { useWalletStore } from "@store";
import { showAlert, showSuccess } from "@utils";
import { DropdownChangeEvent } from "primereact/dropdown";
import { FC } from "react";
import { CustomSelect } from "./Select";
export const TestnetNetworkSelect: FC = () => {
  const {
    wallet: { networkEnvironment, isLoading, network },
  } = useWalletStore();
  const showNetwork =
    networkEnvironment?.environment === BLOCKCHAIN_ENVIRONMENT.TESTNET;
  const testnetNetworks = Object.values(TESTNET_NETWORKS[network]);
  const isTestnetNetwork = (
    value: string
  ): value is TestnetNetworks<NETWORK_NAME> =>
    Boolean(
      (TESTNET_NETWORKS[network] as TestnetNetworks<NETWORK_NAME>)[value]
    );

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
