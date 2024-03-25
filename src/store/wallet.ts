import { BLOCKCHAIN_ENVIRONMENT, NETWORK_NAME } from "@constants";
import { TESTNET_NETWORKS, TestnetNetwork } from "@constants/testnetNetworks";
import { UnitNetwork } from "@constants/unitNetwork";
import { MetamaskClassService } from "@services";
import { AlchemyService } from "@services/alchemy";
import { AppError, showError } from "@utils";
import { JsonRpcSigner } from "ethers";
import { create } from "zustand";
import { Balance, HistoricalData } from "./wallet.types";

interface HistoricalState {
  isLoading: boolean;
  historical: HistoricalData[];
}

interface SendTokensPayload {
  address: string;
  amount: number;
  token: string;
}
export interface WalletState {
  network: NETWORK_NAME;
  networkEnvironment: {
    environment: BLOCKCHAIN_ENVIRONMENT;
    testnetNetwork: TestnetNetwork[NETWORK_NAME.ETHEREUM];
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
  checkInitialConnectionMetamask: () => Promise<void>;
  getAllTokens: (address: string) => Promise<Balance[] | void | undefined>;
  getHistoricalData: () => Promise<HistoricalData[] | void | undefined>;
  getGasPrice: () => Promise<string | undefined>;
  sendToken: (payload: SendTokensPayload) => Promise<void>;
  estimateGas: (payload: SendTokensPayload) => Promise<string | void>;
  wallet: WalletState;
}

const getEnvironmentNetwork = ({
  network,
  networkEnvironment,
}: WalletState) => {
  return networkEnvironment.environment === BLOCKCHAIN_ENVIRONMENT.TESTNET
    ? networkEnvironment.testnetNetwork
    : network;
};

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
  networkEnvironment: () => {
    const { networkEnvironment, network } = get().wallet;
    return networkEnvironment?.environment === BLOCKCHAIN_ENVIRONMENT.TESTNET
      ? network
      : networkEnvironment.testnetNetwork;
  },
  estimateGas: async ({ address: toAddr, amount, token }) => {
    const { address: addr, network, contractAddress } = get().wallet;
    if (!addr || !toAddr || !amount || !token) return;
    try {
      const service = MetamaskClassService.initialize({
        blockchain: get().wallet.network,
        environment: get().wallet.networkEnvironment.environment,
      });
      if (token === UnitNetwork[network]) {
        return (
          await service.getGasRate({ to: toAddr, from: addr, value: amount })
        ).gasRate;
      } else {
        return service.estimateGasOfTxOfToken(
          { to: toAddr, from: addr, value: amount },
          contractAddress[token]
        );
      }
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Error fetching gas price."
      );
    }
  },
  getGasPrice: async () => {
    try {
      const metamask = MetamaskClassService.initialize({
        blockchain: get().wallet.network,
        environment: get().wallet.networkEnvironment.environment,
      });
      if (!metamask)
        throw new AppError("Metamask not supported or not installed.");
      const gasPrice = await metamask.getGasPrice();
      return gasPrice;
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Error fetching gas price."
      );
    }
  },
  sendToken: async payload => {
    const { address, amount, token } = payload;
    const { networkEnvironment } = get().wallet;
    if (!address || !amount || !token || !networkEnvironment) return;
    const fromAddr = get().wallet.address;
    if (!fromAddr) return;
    set(state => ({ wallet: { ...state.wallet, isLoading: true } }));
    try {
      const metamask = MetamaskClassService.initialize({
        blockchain: get().wallet.network,
        environment: networkEnvironment.environment,
      });

      const nonce = await metamask.getTransactionCount(fromAddr);

      const res = await metamask.sendTransaction({
        nonce,
        to: address,
        from: fromAddr,
        value: amount,
      });
      console.log(res);

      set(state => ({ wallet: { ...state.wallet, isLoading: false } }));
    } catch (error) {
      set(state => ({ wallet: { ...state.wallet, isLoading: false } }));
      showError(
        error instanceof Error
          ? error.message
          : "Error sending tokens to the address."
      );
    }
  },
  checkInitialConnectionMetamask: async () => {
    const { network, networkEnvironment } = get().wallet;
    let metamask: MetamaskClassService | null;
    let account: JsonRpcSigner | undefined;
    set(state => ({ wallet: { ...state.wallet, isLoading: true } }));
    try {
      metamask = MetamaskClassService.initialize({
        blockchain: network,
        environment: networkEnvironment.environment,
      });
      account = await metamask?.getAccount();
      if (!account) throw new Error();
    } catch {
      set(state => ({ wallet: { ...state.wallet, isLoading: false } }));
      return;
    }
    try {
      const alchemy = new AlchemyService({
        network: getEnvironmentNetwork(get().wallet),
      });
      console.log(account.address);
      const { balance, contractAddress } = await alchemy.getAllBalances(
        account.address
      );
      set(state => ({
        wallet: {
          ...state.wallet,
          address: account.address,
          balance,
          contractAddress,
          isLoading: false,
        },
      }));

      metamask.onDisconnect(async () => {
        set(state => ({
          wallet: {
            ...state.wallet,
            address: undefined,
            balance: [],
            contractAddress: {},
            historical: {
              isLoading: false,
              historical: [],
            },
          },
        }));
      });
      metamask.accountChanged(async accounts => {
        if (accounts.length > 0) {
          const account = accounts[0];
          const { balance, contractAddress } =
            await alchemy.getAllBalances(account);
          set(state => ({
            wallet: {
              ...state.wallet,
              address: account,
              balance,
              contractAddress,
              isLoading: false,
            },
          }));
        }
      });
    } catch (error) {
      showError(error instanceof Error ? error.message : "");
      set(state => ({ wallet: { ...state.wallet, isLoading: false } }));
    }
  },
  getAllTokens: async () => {
    const { address, networkEnvironment, network } = get().wallet;
    if (!address || !network || !networkEnvironment) return;
    set(state => ({ wallet: { ...state.wallet, isLoading: true } }));
    try {
      const alchemy = new AlchemyService({
        network: getEnvironmentNetwork(get().wallet),
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
    const wallet = get().wallet;
    if (!wallet.address) return;

    set(state => ({
      wallet: {
        ...state.wallet,
        historical: { ...state.wallet.historical, isLoading: true },
      },
    }));

    try {
      const alchemy = new AlchemyService({
        network: getEnvironmentNetwork(wallet),
      });
      const historical = await alchemy.getHistoricalData(wallet.address);

      set(state => ({
        wallet: {
          ...state.wallet,
          historical: { isLoading: false, historical },
        },
      }));
      return historical;
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
    }
  },
  connectViaMetamask: async () => {
    const { networkEnvironment, network } = get().wallet;
    set(state => ({ wallet: { ...state.wallet, isLoading: true } }));
    try {
      const metamask = MetamaskClassService.initialize({
        blockchain: network,
        environment: networkEnvironment.environment,
      });
      if (!metamask)
        throw new Error("Metamask not supported or not installed.");
      const address = await metamask.connect();
      const alchemy = new AlchemyService({
        network:
          networkEnvironment?.environment === BLOCKCHAIN_ENVIRONMENT.TESTNET
            ? networkEnvironment.testnetNetwork
            : network,
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
