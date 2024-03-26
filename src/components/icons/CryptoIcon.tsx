import { getIconUnit } from "@constants/iconUnit";
import { CRYPTO_UNITS } from "@constants/unit";
import { Icon } from "@types";
import { getTokens } from "@utils/getTokens";
import { FC, memo, useEffect, useState } from "react";

export const CryptoImage: FC<{
  symbol: string;
  className?: string;
  width?: number;
  height?: number;
}> = memo(({ symbol, className = "", width, height }) => {
  const [urlImage, setUrlImage] = useState<string>("");
  useEffect(() => {
    const symbolNormalized = symbol;
    getTokens().then(tokens => {
      const token = tokens.find(token => token.symbol === symbolNormalized);
      if (token) {
        setUrlImage(token.logoURI);
      }
    });
  }, [symbol]);
  return (
    <div>
      <img
        className={className}
        width={width}
        height={height}
        draggable={false}
        src={urlImage}
        alt={symbol}
        // Optimized image loading
        loading="lazy"
      />
    </div>
  );
});
export const CryptoIcon: Icon<{ symbol: string }> = memo(
  ({ symbol, width = 25, height = 25, ...rest }) => {
    const Icon = getIconUnit(symbol as CRYPTO_UNITS);

    return CRYPTO_UNITS[symbol as CRYPTO_UNITS] ? (
      <Icon width={width} height={height} {...rest} />
    ) : (
      <CryptoImage symbol={symbol} width={width} height={height} {...rest} />
    );
  }
);
