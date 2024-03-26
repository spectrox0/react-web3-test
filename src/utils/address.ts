import { getAddress, isAddress as isAddressEthers } from "ethers";

export const isAddress = (addr: string) => {
  return isAddressEthers(addr);
};

export const areAddressesEqual = (
  address1?: string | null,
  address2?: string | null
): boolean => {
  try {
    if (!address1 || !address2) {
      return false;
    }
    return getAddress(address1) === getAddress(address2);
  } catch {
    return false;
  }
};
