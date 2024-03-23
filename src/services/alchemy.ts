import { API_KEYS } from "@config";
import { Alchemy, Network } from "alchemy-sdk";

export class AlchemyService {
  alchemy: Alchemy;
  network: Network;

  constructor({ network = Network.ETH_SEPOLIA }: { network: Network }) {
    const config = {
      apiKey: API_KEYS.alchemy,
      network,
    };
    this.alchemy = new Alchemy(config);
    this.network = network;
  }

  getAllTokens = async (address: string) => {
    const balances = await this.alchemy.core.getTokenBalances(address);

    // Remove tokens with zero balance
    const nonZeroBalances = balances.tokenBalances.filter(token => {
      return Number(token.tokenBalance) > 0;
    });

    return Promise.all(
      nonZeroBalances.map(async token => {
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
        const balance = (
          Number(token.tokenBalance) / Math.pow(10, metadata.decimals)
        ).toFixed(2);
        return {
          name: metadata.name as string,
          balance,
          symbol: metadata.symbol as string,
        };
      })
    );
  };

  getNetwork(): Network {
    return this.network;
  }
}
