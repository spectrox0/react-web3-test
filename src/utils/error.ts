import { showError } from "@utils/message";
export const ERROR_MESSAGES = Object.freeze({
  NOT_SUPPORT: "Not support",
  NOT_CONNECTED: "Not connected",
  NOT_CONNECTED_WALLET: "Not connected wallet",
  NOT_CONNECTED_NETWORK: "Not connected network",
  ACCOUNT_NOT_FOUND: "account not found",
  SERVER_ERROR: "Server error",
  GETTING_SIGNATURE: "Error getting signature",
  ERROR_CONNECT_TO_WALLET: "Error connect to wallet",
  ERROR: "Error",
} as const);

export class AppError extends Error {
  private statusCode = 400;

  constructor(
    message: keyof typeof ERROR_MESSAGES | string = "ERROR",
    code = 400
  ) {
    const msg = Object.keys(ERROR_MESSAGES).some(item => item === message)
      ? ERROR_MESSAGES[`${message as keyof typeof ERROR_MESSAGES}`]
      : message;
    super(msg);
    Object.setPrototypeOf(this, AppError.prototype);
    showError(message);
    if (code) this.statusCode = 400;
  }

  getErrorMessage(): string {
    return this.message;
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}
