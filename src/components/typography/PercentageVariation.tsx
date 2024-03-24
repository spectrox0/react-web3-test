import { formatCurrency, percentageVariation } from "@utils";
import { useMemo, type FC } from "react";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  value: number;
  className?: string;
  format?: "percent" | "decimal" | "currency";
}
export const PercentageVariationText: FC<Props> = ({
  value,
  className = "m-0 p-0 font-bold",
  format = "percent",
  ...rest
}) => {
  const variation = useMemo(() => percentageVariation(value), [value]);
  const formattedValue = formatCurrency(value, format);

  return (
    <p className={`${className} ${variation}`} {...rest}>
      {value > 0 && "+"}
      {formattedValue}
    </p>
  );
};
