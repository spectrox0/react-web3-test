import { BlockchainByMethod, EXTERNAL_METHODS } from "@constants";
import { BLOCKCHAIN_ENVIRONMENT } from "@constants/blockchainEnvironment";

export type ConstructorExternalMethod<T extends EXTERNAL_METHODS> = {
  environment: BLOCKCHAIN_ENVIRONMENT;
  method: T;
  blockchain: BlockchainByMethod[T];
};
export abstract class ExternalConnectMethod<
  T extends EXTERNAL_METHODS = EXTERNAL_METHODS,
> {
  protected environment: BLOCKCHAIN_ENVIRONMENT;

  protected method: T;

  protected blockchain: BlockchainByMethod[T];

  protected address?: string;

  protected signature?: string;

  public disconnect?: () => Promise<void>;

  constructor({
    environment,
    method,
    blockchain,
  }: ConstructorExternalMethod<T>) {
    this.environment = environment;
    this.method = method;
    this.blockchain = blockchain;
  }

  getMethod = () => this.method;

  getBlockchain = () => this.blockchain;

  abstract connect: () => Promise<string | undefined>;

  abstract getSignature: () => Promise<string | undefined> | string | undefined;

  abstract sendTransaction: (params: unknown) => Promise<unknown> | unknown;
}
