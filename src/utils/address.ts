import { getAddress, isAddress as isAddressEthers } from "ethers";

export const isAddress = (addr: string) => {
  return isAddressEthers(addr);
};

export const areAddressesEqual = (
  address1: string,
  address2: string
): boolean => {
  try {
    return getAddress(address1) === getAddress(address2);
  } catch {
    return false;
  }
};
