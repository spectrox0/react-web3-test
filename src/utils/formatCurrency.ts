export const formatCurrency = (
  value: number,
  style: "currency" | "decimal" | "percent" = "decimal",
  currency?: string,
  local = "en-US"
) => {
  return new Intl.NumberFormat(local, {
    style,
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: style === "percent" ? 2 : 5,
  }).format(value);
};
