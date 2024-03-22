import { BLOCKCHAIN_ENVIRONMENT, NETWORK_NAME } from "@constants";
import { TESTNET_NETWORKS, TestnetNetworks } from "@constants/testnetNetworks";
import { MetamaskClassService } from "@services";
import { showError } from "@utils";
import { create } from "zustand";

interface Wallet {
  network: NETWORK_NAME;
  networkEnvironment?: {
    environment: BLOCKCHAIN_ENVIRONMENT;
    testnetNetwork?: TestnetNetworks<NETWORK_NAME>;
  };
  address?: string;
  balance: number;
  percentage24h: number;
  newAmount24h: number;
  isLoading: boolean;
}
interface WalletStoreState {
  increment: (amount: number) => void;
  decrement: (amount: number) => void;
  connectViaMetamask: () => Promise<void>;
  wallet: Wallet;
}

const initialState: Wallet = {
  network: NETWORK_NAME.ETHEREUM,
  networkEnvironment: {
    environment: BLOCKCHAIN_ENVIRONMENT.TESTNET,
    testnetNetwork: TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA,
  },
  address: undefined,
  balance: 0,
  isLoading: false,
  percentage24h: 0,
  newAmount24h: 0,
};

export const useWalletStore = create<WalletStoreState>(set => ({
  wallet: initialState,
  increment: amount =>
    set(state => ({
      wallet: { ...state.wallet, balance: state.wallet.balance + amount },
    })),
  decrement: amount =>
    set(state => ({
      wallet: { ...state.wallet, balance: state.wallet.balance - amount },
    })),
  connectViaMetamask: async () => {
    set(state => ({ wallet: { ...state.wallet, isLoading: true } }));
    try {
      const metamask = MetamaskClassService.initialize({
        blockchain: NETWORK_NAME.ETHEREUM,
        environment: BLOCKCHAIN_ENVIRONMENT.TESTNET,
      });
      if (!metamask)
        throw new Error("Metamask not supported or not installed.");
      const address = await metamask.connect();
      set(state => ({
        wallet: { ...state.wallet, address, isLoading: false },
      }));
    } catch (error) {
      set(state => ({ wallet: { ...state.wallet, isLoading: false } }));
      showError(
        error instanceof Error ? error.message : "Error connecting to Metamask."
      );
    }
  },
}));
