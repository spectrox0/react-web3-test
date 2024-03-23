import { API_KEYS } from "@config";
import { NETWORK_NAME } from "@constants";
import { EXPLORER_BASE_URL } from "@constants/baseExplorer";
import { TESTNET_NETWORKS } from "@constants/testnetNetworks";
import { UnitNetwork } from "@constants/unitNetwork";
import { Balance, HistoricalData } from "@store/wallet.types";
import {
  Alchemy,
  AssetTransfersCategory,
  BlockTag,
  Network,
  TokenBalance,
  Utils,
} from "alchemy-sdk";

const NETWORK_MAP = {
  [Network.ETH_SEPOLIA]: TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA,
} as const;

export class AlchemyService {
  alchemy: Alchemy;
  network: Network;
  explorerBaseUrl: Record<"TRANSACTION" | "ADDRESS", string>;

  constructor({
    network = Network.ETH_SEPOLIA,
  }: {
    network: Network.ETH_SEPOLIA;
  }) {
    const config = {
      apiKey: API_KEYS.alchemy.ETHEREUM.SEPOLIA,
      network,
    };
    this.alchemy = new Alchemy(config);
    this.network = network;
    this.explorerBaseUrl =
      EXPLORER_BASE_URL.ETHEREUM.TESTNET[NETWORK_MAP[network]];
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
    const data2 = await this.alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: address,
      category: [
        AssetTransfersCategory.EXTERNAL, // <-- ETH
        AssetTransfersCategory.INTERNAL, // <-- ETH
        AssetTransfersCategory.ERC20, // <-- ERC20 (Tokens),
        AssetTransfersCategory.ERC721, // <-- ERC721 (NFTs),
        AssetTransfersCategory.ERC1155, // <-- ERC1155 (NFTs),
      ],
    });
    const data = await this.alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toAddress: address,
      category: [
        AssetTransfersCategory.EXTERNAL, // <-- ETH
        AssetTransfersCategory.INTERNAL, // <-- ETH
        AssetTransfersCategory.ERC20, // <-- ERC20 (Tokens),
        AssetTransfersCategory.ERC721, // <-- ERC721 (NFTs),
        AssetTransfersCategory.ERC1155, // <-- ERC1155 (NFTs),
      ],
    });
    console.log("data2", data2);

    return Promise.all(
      data.transfers.map(async tx => {
        const urlExplorer = `${this.explorerBaseUrl.TRANSACTION}${tx.hash}`;
        const date = await this.alchemy.core.getBlock(tx.blockNum);
        return {
          date: date.timestamp * 1000,
          amount: Number(tx.value),
          category: tx.category,
          symbol: (tx.asset as string).toUpperCase(),
          fromAddress: tx.from as string, // <-- if the from address is 0x0000000000000000000000000000000000000000 this mean that the transaction from airdrop or faucet
          toAddress: tx.to as string,
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
