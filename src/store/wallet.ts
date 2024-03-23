import { BLOCKCHAIN_ENVIRONMENT, NETWORK_NAME } from "@constants";
import { TESTNET_NETWORKS, TestnetNetworks } from "@constants/testnetNetworks";
import { MetamaskClassService } from "@services";
import { AlchemyService } from "@services/alchemy";
import { showError } from "@utils";
import { Network as AlchemyNetwork } from "alchemy-sdk";
import { create } from "zustand";
import { Balance, HistoricalData } from "./wallet.types";

interface HistoricalState {
  isLoading: boolean;
  historical: HistoricalData[];
}
export interface WalletState {
  network: NETWORK_NAME;
  networkEnvironment?: {
    environment: BLOCKCHAIN_ENVIRONMENT;
    testnetNetwork?: TestnetNetworks<NETWORK_NAME.ETHEREUM>;
  };
  address?: string;
  balance: Balance[];
  contractAddress: Record<string, string>;
  percentage24h: number;
  newAmount24h: number;
  isLoading: boolean;
  historical: HistoricalState;
}
interface WalletStoreState {
  increment: (amount: number) => void;
  decrement: (amount: number) => void;
  connectViaMetamask: () => Promise<void>;
  getAllTokens: (address: string) => Promise<Balance[] | void | undefined>;
  getHistoricalData: () => Promise<HistoricalData[] | void | undefined>;
  wallet: WalletState;
}

const initialState: WalletState = {
  network: NETWORK_NAME.ETHEREUM,
  networkEnvironment: {
    environment: BLOCKCHAIN_ENVIRONMENT.TESTNET,
    testnetNetwork: TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA,
  },
  address: undefined,
  contractAddress: {},
  balance: [],
  historical: {
    isLoading: false,
    historical: [],
  },
  isLoading: false,
  percentage24h: 0,
  newAmount24h: 0,
};

export const useWalletStore = create<WalletStoreState>((set, get) => ({
  wallet: initialState,
  increment: () =>
    set(state => ({
      wallet: { ...state.wallet },
    })),
  decrement: () =>
    set(state => ({
      wallet: { ...state.wallet },
    })),
  getAllTokens: async () => {
    const address = get().wallet.address;
    if (!address) return;
    set(state => ({ wallet: { ...state.wallet, isLoading: true } }));
    try {
      const alchemy = new AlchemyService({
        network: AlchemyNetwork.ETH_SEPOLIA,
      });
      const { balance, contractAddress } =
        await alchemy.getAllBalances(address);
      set(state => ({
        wallet: {
          ...state.wallet,
          balance,
          contractAddress,
          isLoading: false,
        },
      }));
      return balance;
    } catch (error) {
      set(state => ({ wallet: { ...state.wallet, isLoading: false } }));
      showError(
        error instanceof Error
          ? error.message
          : "Error fetching token balances."
      );
    }
  },
  getHistoricalData: async () => {
    const address = get().wallet.address;
    if (!address) return;

    set(state => ({
      wallet: {
        ...state.wallet,
        historical: { ...state.wallet.historical, isLoading: true },
      },
    }));

    try {
      const alchemy = new AlchemyService({
        network: AlchemyNetwork.ETH_SEPOLIA,
      });
      const historical = await alchemy.getHistoricalData(address);

      console.log("Historico", historical);
    } catch (error) {
      set(state => ({
        wallet: {
          ...state.wallet,
          historical: { isLoading: false, historical: [] },
        },
      }));
      showError(
        error instanceof Error
          ? error.message
          : "Error fetching historical data."
      );
      return [];
    }
  },
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
      const alchemy = new AlchemyService({
        network: AlchemyNetwork.ETH_SEPOLIA,
      });
      const { balance, contractAddress } =
        await alchemy.getAllBalances(address);
      set(state => ({
        wallet: {
          ...state.wallet,
          address,
          isLoading: false,
          balance,
          contractAddress,
        },
      }));
    } catch (error) {
      set(state => ({ wallet: { ...state.wallet, isLoading: false } }));
      showError(
        error instanceof Error ? error.message : "Error connecting to Metamask."
      );
    }
  },
}));
