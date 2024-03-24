import { getIconUnit } from "@constants/iconUnit";
import { CRYPTO_UNITS } from "@constants/unit";
import { Icon } from "@types";
import { memo } from "react";

export const CryptoIcon: Icon<{ symbol: string }> = memo(
  ({ symbol, width = 25, height = 25, ...rest }) => {
    const Icon = getIconUnit(symbol as CRYPTO_UNITS);
    return <Icon width={width} height={height} {...rest} />;
  }
);
