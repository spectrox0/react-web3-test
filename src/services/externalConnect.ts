import { BlockchainByMethod, EXTERNAL_METHODS } from "@constants";
import { BLOCKCHAIN_ENVIRONMENT } from "@constants/blockchainEnvironment";
import {
  defaultTestnetNetwork,
  TestnetNetwork,
} from "@constants/testnetNetworks";

export type ConstructorExternalMethod<
  T extends EXTERNAL_METHODS,
  E extends BlockchainByMethod[T] = BlockchainByMethod[T],
> = {
  readonly environment: BLOCKCHAIN_ENVIRONMENT;
  readonly method: T;
  readonly blockchain: E;
  readonly testnetNetwork?: TestnetNetwork[E];
};
export abstract class ExternalConnectMethod<
  T extends EXTERNAL_METHODS,
  E extends BlockchainByMethod[T] = BlockchainByMethod[T],
> {
  protected environment: BLOCKCHAIN_ENVIRONMENT;

  protected method: T;

  protected blockchain: E;

  readonly testnetNetwork: TestnetNetwork[E];

  protected address?: string;

  protected signature?: string;

  public disconnect?: () => Promise<void>;

  constructor({
    environment,
    method,
    blockchain,
    testnetNetwork,
  }: ConstructorExternalMethod<T, E>) {
    this.environment = environment;
    this.testnetNetwork =
      testnetNetwork ||
      (defaultTestnetNetwork[blockchain] as TestnetNetwork[E]);

    this.method = method;
    this.blockchain = blockchain;
  }

  getMethod = () => this.method;

  getBlockchain = () => this.blockchain;

  abstract connect: () => Promise<string | undefined>;

  abstract getSignature: () => Promise<string | undefined> | string | undefined;

  abstract sendTransaction: (params: {
    value?: string | number;
    to?: string;
    data?: string;
    from?: string;
    chainId?: string;
    gasLimit?: string;
    nonce?: string | number;
    maxFeePerGas: string;
    maxPriorityFeePerGas?: string;
  }) => Promise<unknown> | unknown;
}
