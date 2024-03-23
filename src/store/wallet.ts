import { BLOCKCHAIN_ENVIRONMENT, NETWORK_NAME } from "@constants";
import { TESTNET_NETWORKS, TestnetNetworks } from "@constants/testnetNetworks";
import { MetamaskClassService } from "@services";
import { AlchemyService } from "@services/alchemy";
import { showError } from "@utils";
import { Network as AlchemyNetwork } from "alchemy-sdk";
import { create } from "zustand";

export interface Balance {
  name: string;
  balance: number;
  symbol: string;
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
}
interface WalletStoreState {
  increment: (amount: number) => void;
  decrement: (amount: number) => void;
  connectViaMetamask: () => Promise<void>;
  getAllTokens: (address: string) => Promise<Balance[]>;
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
  isLoading: false,
  percentage24h: 0,
  newAmount24h: 0,
};

export const useWalletStore = create<WalletStoreState>(set => ({
  wallet: initialState,
  increment: () =>
    set(state => ({
      wallet: { ...state.wallet },
    })),
  decrement: () =>
    set(state => ({
      wallet: { ...state.wallet },
    })),
  getAllTokens: async (address: string) => {
    set(state => ({ wallet: { ...state.wallet, isLoading: true } }));
    try {
      const alchemy = new AlchemyService({
        network: AlchemyNetwork.ETH_SEPOLIA,
      });
      const tokenBalance = await alchemy.getAllTokensBalance(address);
      const { balances, contractAddress } =
        await alchemy.getAllTokens(tokenBalance);
      console.log(balances);
      set(state => ({
        wallet: {
          ...state.wallet,
          balance: balances,
          contractAddress,
          isLoading: false,
        },
      }));
      return balances;
    } catch (error) {
      set(state => ({ wallet: { ...state.wallet, isLoading: false } }));
      showError(
        error instanceof Error
          ? error.message
          : "Error fetching token balances."
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
      console.log("address", address);
      const alchemy = new AlchemyService({
        network: AlchemyNetwork.ETH_SEPOLIA,
      });
      const [{ balances, contractAddress }, balanceETH] = await Promise.all([
        alchemy.getAllTokensBalance(address).then(alchemy.getAllTokens),
        alchemy.getBalance(address),
      ]);
      set(state => ({
        wallet: {
          ...state.wallet,
          address,
          isLoading: false,
          balance: [balanceETH as Balance].concat(balances),
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
