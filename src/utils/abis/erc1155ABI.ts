// ERC1155 ABI for transfer and balanceOf methods
// ERC1155 means "Ethereum Request for Comments 1155: Non-Fungible Tokens (NFT)".
export const transferERC1155ABI = {
  inputs: [
    {
      internalType: "address",
      name: "from",
      type: "address",
    },
    {
      internalType: "address",
      name: "to",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "id",
      type: "uint256",
    },
    {
      internalType: "uint256",
      name: "amount",
      type: "uint256",
    },
    {
      internalType: "bytes",
      name: "data",
      type: "bytes",
    },
  ],
  name: "safeTransferFrom",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};

// ERC1155 ABI for balanceOf method to get the balance of a specific ERC1155 token for a specific address (account)
export const balanceOfERC1155ABI = {
  inputs: [
    {
      internalType: "address",
      name: "account",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "id",
      type: "uint256",
    },
  ],
  name: "balanceOf",
  outputs: [
    {
      internalType: "uint256",
      name: "",
      type: "uint256",
    },
  ],
  stateMutability: "view",
  type: "function",
};
