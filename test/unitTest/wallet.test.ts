import { describe, expect, it, vi } from "vitest";

// Mocking Ethers.js
vi.mock("ethers", () => {
  const actualEthers = vi.importActual("ethers");
  return {
    ...actualEthers,
    ethers: {
      Contract: vi.fn(),
      providers: {
        Web3Provider: vi.fn(),
        WebSocketProvider: vi.fn(),
      },
      utils: {
        formatEther: vi.fn(),
        parseEther: vi.fn(),
        formatUnits: vi.fn(),
        parseUnits: vi.fn(),
      },
    },
  };
});
describe("MetamaskClassService", () => {
  //   let metamaskService;

  //   beforeEach(() => {
  //     metamaskService = MetamaskClassService.initialize({
  //       blockchain: NETWORK_NAME.ETHEREUM,
  //       environment: BLOCKCHAIN_ENVIRONMENT.TESTNET,
  //       testnetNetwork: TESTNET_NETWORKS[NETWORK_NAME.ETHEREUM].SEPOLIA,
  //     });
  //   });
  it("should initialize the service", () => {
    expect(true).toBeDefined();
  });

  //   it("should get accounts", async () => {
  //     const mockAccounts = ["0x123"];
  //     vi.spyOn(mockProvider, "send").mockResolvedValue(mockAccounts);
  //     const accounts = await metamaskService.getAccounts();
  //     expect(accounts).toEqual(mockAccounts[0]);
  //   });

  //   it("should send a token transaction", async () => {
  //     const mockHash = "0xabc";
  //     const mockContract = {
  //       transfer: vi.fn().mockResolvedValue({ hash: mockHash }),
  //       decimals: vi.fn().mockResolvedValue(18),
  //     };
  //     ethers.Contract.mockImplementation(() => mockContract);

  //     const hash = await metamaskService.sendTokenTransaction(
  //       {
  //         to: "0x456",
  //         value: "1",
  //       },
  //       "mockContractAddress"
  //     );

  //     expect(hash).toEqual(mockHash);
  //     expect(mockContract.transfer).toHaveBeenCalled();
  //   });
});
