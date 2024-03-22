import { EXTERNAL_METHODS, NETWORK_NAME } from "@constants";
import { AVAILABLE_TOKEN, AvailableToken } from "@constants/availableToken";
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
import { WEI_DECIMAL } from "@constants/weiDecimal";
import { ABI_ERC20, AppError } from "@utils";
import {
  BrowserProvider,
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

  isValidUnit = (
    unit: CRYPTO_UNITS
  ): unit is AvailableToken<NETWORK_NAME.ETHEREUM> => {
    return AVAILABLE_TOKEN[this.blockchain].some(value => value === unit);
  };

  getContractAddress = (
    unit: AvailableToken<NETWORK_NAME.ETHEREUM> = CRYPTO_UNITS.USDC
  ) => {
    if (!this.isValidUnit(unit)) throw new AppError(`Invalid Unit`);
    const address = this.contractAddress[unit] as string;
    if (!address) throw new Error(`Invalid payment unit`);
    return address;
  };

  getTransactionReceipts = async (
    txId: string
  ): Promise<TransactionReceipt | null> =>
    this.provider.getTransactionReceipt(txId);

  getCryptoBalance = async (account: string | ethers.JsonRpcSigner) => {
    const balance = await this.provider.getBalance(account);
    return {
      value: Number(formatEther(balance)),
      symbol: UnitNetwork[this.blockchain],
      valueInWei: balance,
      decimals: WEI_DECIMAL, // <--- This is the default value for the decimals of the crypto currency in the network (18 for Ethereum (ETH) and Polygon (MATIC)),
    };
  };

  getBalance = async ({
    account,
    symbol = UnitNetwork[
      this.blockchain
    ] as AvailableToken<NETWORK_NAME.ETHEREUM>,
  }: {
    account: string | ethers.JsonRpcSigner;
    symbol?: AvailableToken<NETWORK_NAME.ETHEREUM>;
  }) => {
    if (symbol === UnitNetwork[this.blockchain])
      return this.getCryptoBalance(account);

    const contract = new ethers.Contract(
      this.getContractAddress(symbol),
      ABI_ERC20,
      this.provider
    );
    if (!contract) throw new AppError("Contract not found");
    const [balance, decimals] = await Promise.all([
      contract.balanceOf(account),
      contract.decimals(),
    ]);
    const valueInWei = Number(balance);
    const formatDecimals = Number(decimals);
    return {
      value: valueInWei / 10 ** formatDecimals,
      decimals: formatDecimals,
      symbol,
      valueInWei,
    };
  };

  getAllBalances = async (account: string | ethers.JsonRpcSigner) => {
    return Promise.allSettled(
      AVAILABLE_TOKEN[this.blockchain].map(async symbol => {
        return this.getBalance({ account, symbol });
      })
    ).then(results => {
      return (
        results.filter(
          result => result.status === "fulfilled"
        ) as PromiseFulfilledResult<ReturnType<this["getBalance"]>>[]
      ).map(result => result.value);
    });
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
      const account = accounts[0];

      const balances = await this.getAllBalances(account);
      return {
        account,
        balances,
      };
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
