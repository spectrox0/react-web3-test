import { API_KEYS } from "@config";
import { NETWORK_NAME } from "@constants";
import { EXPLORER_BASE_URL } from "@constants/baseExplorer";
import { TESTNET_NETWORKS } from "@constants/testnetNetworks";
import { UnitNetwork } from "@constants/unitNetwork";
import { Balance, HistoricalData } from "@store/wallet.types";
import {
  Alchemy,
  Network as AlchemyNetwork,
  AssetTransfersCategory,
  BlockTag,
  TokenBalance,
  Utils,
} from "alchemy-sdk";

const NETWORK_MAP = Object.freeze({
  [TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA]: AlchemyNetwork.ETH_SEPOLIA,
  [TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].GOERLI]: AlchemyNetwork.ETH_GOERLI,
  [TESTNET_NETWORKS[NETWORK_NAME.POLYGON].MUMBAI]: AlchemyNetwork.MATIC_MUMBAI,
  [NETWORK_NAME.ETHEREUM]: AlchemyNetwork.ETH_MAINNET,
  [NETWORK_NAME.POLYGON]: AlchemyNetwork.MATIC_MAINNET,
} as const);
export type Network = keyof typeof NETWORK_MAP;

const CATEGORY_TX_MAP = Object.freeze({
  [AssetTransfersCategory.EXTERNAL]: "External",
  [AssetTransfersCategory.INTERNAL]: "Internal",
  [AssetTransfersCategory.SPECIALNFT]: "Special NFT",
  [AssetTransfersCategory.ERC20]: "ERC 20",
  [AssetTransfersCategory.ERC721]: "ERC 721",
  [AssetTransfersCategory.ERC1155]: "ERC 1155",
} as const);

export class AlchemyService {
  alchemy: Alchemy;
  network: Network;
  explorerBaseUrl: string;

  constructor({
    network = TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA,
  }: {
    network: keyof typeof NETWORK_MAP;
  }) {
    const config = {
      apiKey: API_KEYS.alchemy.ETHEREUM.SEPOLIA,
      network: NETWORK_MAP[network],
    };
    this.alchemy = new Alchemy(config);
    this.network = network;
    this.explorerBaseUrl =
      EXPLORER_BASE_URL.ETHEREUM.TESTNET[TESTNET_NETWORKS.ETHEREUM.SEPOLIA];
  }

  getBalance = async (
    address: string,
    date: BlockTag | Promise<BlockTag> | undefined = "latest"
  ) => {
    const balance = Utils.formatEther(
      await this.alchemy.core.getBalance(address, date)
    );
    return {
      balance: Number(balance),
      name: NETWORK_NAME.ETHEREUM,
      symbol: UnitNetwork[NETWORK_NAME.ETHEREUM],
    };
  };

  getAllTokensBalance = async (address: string) => {
    return (await this.alchemy.core.getTokenBalances(address)).tokenBalances;
  };

  getAllTokensNonZeroBalance = async (address: string) => {
    const balances = await this.getAllTokensBalance(address);
    return balances.filter(token => {
      return Number(token.tokenBalance) > 0;
    });
  };

  getCurrentGasPrice = async () => {
    const gasGasInHex = await this.alchemy.core.getGasPrice();
    // The the gas price in gwei format , the gwei is the most common format to show the gas price
    return Utils.formatUnits(gasGasInHex, "gwei");
  };

  estimateGasOfTx = async (tx: { to: string }) => {
    const res = await this.alchemy.core.estimateGas({
      to: tx.to,
      // `function deposit() payable`
      data: "0xd0e30db0",
      // 1 ether
      value: Utils.parseEther("1.0"),
    });
    return res;
  };

  getAllTokens = async (balances: TokenBalance[]) => {
    const contractAddress = {} as Record<string, string>;
    const res = await Promise.all(
      balances.map(async token => {
        // Get balance of token

        // Get metadata of token
        const metadata = await this.alchemy.core.getTokenMetadata(
          token.contractAddress
        );
        if (
          metadata?.decimals === null ||
          metadata?.decimals === undefined ||
          isNaN(Number(metadata?.decimals)) ||
          token.tokenBalance === null ||
          token.tokenBalance === undefined ||
          isNaN(Number(token.tokenBalance))
        )
          throw new Error("Invalid token metadata or balance");

        // Compute token balance in human-readable format
        const balance =
          Number(token.tokenBalance) / Math.pow(10, metadata.decimals);
        const symbol = (metadata.symbol as string).toUpperCase();
        contractAddress[symbol] = token.contractAddress;
        return {
          name: metadata.name as string,
          balance,
          symbol,
        };
      })
    );
    return { balances: res, contractAddress };
  };

  getAllBalances = async (address: string) => {
    const [{ balances, contractAddress }, balanceETH] = await Promise.all([
      this.getAllTokensBalance(address).then(this.getAllTokens),
      this.getBalance(address),
    ]);
    return {
      balance: [balanceETH as Balance].concat(balances),
      contractAddress,
    };
  };

  getHistoricalData = async (address: string): Promise<HistoricalData[]> => {
    const category = [
      AssetTransfersCategory.EXTERNAL, // <-- ETH
      AssetTransfersCategory.INTERNAL, // <-- ETH
      AssetTransfersCategory.ERC20, // <-- ERC20 (Tokens),
      AssetTransfersCategory.ERC721, // <-- ERC721 (NFTs),
      AssetTransfersCategory.ERC1155, // <-- ERC1155 (NFTs),
    ];
    const data = await Promise.all([
      this.alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toAddress: address,
        category,
      }),
      this.alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category,
      }),
    ])
      // In this case, we are interested in both the transactions that the user has received and the transactions that the user has sent
      // So we concatenate the two arrays
      // We suppose that the user has received the transaction if the toAddress is equal to the user's address
      .then(([receive, send]) => receive.transfers.concat(send.transfers));

    return Promise.all(
      data.map(async tx => {
        const urlExplorer = `${this.explorerBaseUrl}tx/${tx.hash}`;
        const date = await this.alchemy.core.getBlock(tx.blockNum);
        return {
          date: date.timestamp * 1000,
          amount: Number(tx.value),
          category: CATEGORY_TX_MAP[tx.category],
          symbol: (tx.asset as string).toUpperCase(),
          fromAddress: tx.from as string, // <-- if the from address is 0x0000000000000000000000000000000000000000 this mean that the transaction from airdrop or faucet
          toAddress: tx.to as string,
          receive: tx.to === address,
          urlExplorer,
          txHash: tx.hash,
        };
      })
    );
  };
  getNetwork(): Network {
    return this.network;
  }
}
