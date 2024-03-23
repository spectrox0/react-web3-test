export interface Balance {
  name: string;
  balance: number;
  symbol: string;
}

export interface HistoricalData {
  date: number;
  amount: number;
  category: string;
  symbol: string;
  fromAddress: string;
  toAddress: string;
  urlExplorer: string;
  txHash: string;
}
