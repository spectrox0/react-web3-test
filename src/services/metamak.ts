import { EXTERNAL_METHODS, NETWORK_NAME } from "@constants";
import {
  AVAILABLE_TOKEN,
  AvailablePaymentUnit,
} from "@constants/availableToken";
import { BLOCKCHAIN_ENVIRONMENT } from "@constants/blockchainEnvironment";
import {
  chainId,
  defaultTestChainId,
  rpcUrls,
  testnetDefaultRpcUrls,
} from "@constants/chainIds";
import {
  contractAddress,
  defaultTestnetContractAddress,
} from "@constants/contractAddress";
import { CRYPTO_UNITS } from "@constants/unit";
import { UnitNetwork } from "@constants/unitNetwork";
import { ABI_ERC20, AppError } from "@utils";
import {
  BrowserProvider,
  Contract,
  ethers,
  formatEther,
  TransactionReceipt,
  TransactionResponse,
} from "ethers";
import {
  ConstructorExternalMethod,
  ExternalConnectMethod,
} from "./externalConnect";

export const MetamaskSupport =
  typeof window !== "undefined" && window.ethereum?.isMetaMask;
const isConstructor = Symbol("IsConstructor");

type Constructor = Omit<
  ConstructorExternalMethod<EXTERNAL_METHODS.METAMASK>,
  "method"
>;

export class MetamaskClassService extends ExternalConnectMethod<EXTERNAL_METHODS.METAMASK> {
  private readonly provider: BrowserProvider;

  private readonly chainId: string;

  private readonly rpcUrls: readonly string[];

  private readonly contractAddress: Record<string, string>;

  constructor(
    {
      blockchain,
      environment,
      provider,
    }: Constructor & {
      provider: BrowserProvider;
    },
    symbol: symbol
  ) {
    if (symbol !== isConstructor) throw new Error("Invalid constructor");
    if (!MetamaskSupport) throw new AppError("not metamask support");
    super({ blockchain, environment, method: EXTERNAL_METHODS.METAMASK });
    this.provider = provider;
    // This is the chainId for the network you want to connect
    // We need to convert it to hexadecimal
    this.chainId = `0x${(environment === BLOCKCHAIN_ENVIRONMENT.TESTNET ? defaultTestChainId[blockchain] : chainId[environment][blockchain]).toString(16)}`;

    this.rpcUrls =
      environment === BLOCKCHAIN_ENVIRONMENT.TESTNET
        ? testnetDefaultRpcUrls[`${blockchain}`]
        : rpcUrls[`${environment}`][`${blockchain}`];
    this.contractAddress =
      environment === BLOCKCHAIN_ENVIRONMENT.TESTNET
        ? defaultTestnetContractAddress[`${blockchain}`]
        : contractAddress[`${environment}`][`${blockchain}`];
  }

  getAccounts = async (): Promise<string> => {
    await this.provider.send("wallet_requestPermissions", [
      { eth_accounts: {} },
    ]);
    await this.provider.send("wallet_addEthereumChain", [
      {
        chainId: this.chainId,
        chainName: this.blockchain,
        rpcUrls: this.rpcUrls,
        nativeCurrency: {
          name: this.blockchain,
          symbol: UnitNetwork[this.blockchain],
          decimals: 18,
        },
      },
    ]);
    await this.provider.send("wallet_switchEthereumChain", [
      { chainId: this.chainId },
    ]);
    const [sender] = await this.provider.send("eth_requestAccounts", []);
    console.log(sender);
    return sender as string;
  };

  static initialize({ blockchain, environment }: Constructor) {
    const provider = new BrowserProvider(window.ethereum);
    return provider
      ? new this({ blockchain, environment, provider }, isConstructor)
      : null;
  }

  isValidPaymentUnit = (
    unit: CRYPTO_UNITS
  ): unit is AvailablePaymentUnit<NETWORK_NAME.ETHEREUM> => {
    return AVAILABLE_TOKEN[this.blockchain].some(value => value === unit);
  };

  getContractAddress = (
    unit: AvailablePaymentUnit<NETWORK_NAME.ETHEREUM> = CRYPTO_UNITS.USDC
  ) => {
    if (!this.isValidPaymentUnit(unit)) throw new Error(`Invalid payment unit`);
    const address = this.contractAddress[unit] as string;
    if (!address) throw new Error(`Invalid payment unit`);
    return address;
  };

  getTransactionReceipts = async (
    txId: string
  ): Promise<TransactionReceipt | null> =>
    this.provider.getTransactionReceipt(txId);

  getCryptoBalance = async ({ address }: { address: string }) => {
    const balance = await this.provider.getBalance(address);
    return Number(formatEther(balance));
  };

  getBalance = async ({
    address,
    paymentUnit = UnitNetwork[
      this.blockchain
    ] as AvailablePaymentUnit<NETWORK_NAME.ETHEREUM>,
  }: {
    address: string;
    paymentUnit?: AvailablePaymentUnit<NETWORK_NAME.ETHEREUM>;
  }) => {
    if (paymentUnit === UnitNetwork[this.blockchain])
      return this.getCryptoBalance({ address });

    const contract = new ethers.Contract(
      this.getContractAddress(paymentUnit),
      ABI_ERC20,
      this.provider
    );
    if (!contract) throw new Error("contract not found");
    const [balance, decimals] = await Promise.all([
      contract.balanceOf(address),
      contract.decimals(),
    ]);
    return Number(balance) / 10 ** Number(decimals);
  };

  connect = async () => {
    try {
      const res = await this.getAccounts();
      if (!res) throw new AppError(`Could not get account information`);
      this.address = res;
      return res;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      throw new AppError("Error connecting to MetaMask.");
    }
  };

  sendTransaction = async (params: unknown) => {
    const { hash }: TransactionResponse = await this.provider.send(
      "eth_sendTransaction",
      [params]
    );
    return hash as string;
  };

  async getWalletInfo() {
    try {
      const accounts = await this.provider.listAccounts();
      const account = accounts[0]; // Tomando la primera cuenta

      const balance = await this.provider.getBalance(account);
      console.log(`Balance: ${formatEther(balance)} ETH`);

      // Aquí deberías llamar a los contratos inteligentes para obtener la composición de la billetera, usando por ejemplo:
      const contract = new Contract(
        "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
        ABI_ERC20,
        this.provider
      );
      const tokenBalance = await contract.balanceOf(account);
      console.log(`Token balance: ${tokenBalance}`);
    } catch (error) {
      console.error("Error getting wallet info:", error);
      throw new AppError("Error getting wallet information.");
    }
  }

  getSignature = async () => {
    const signature = await this.provider.send("personal_sign", [
      this.address,
      this.blockchain,
    ]);

    this.signature = signature as string;
    return signature as string;
  };
}
