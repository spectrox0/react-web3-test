export const formatCurrency = (
  value: number,
  style: "currency" | "decimal" | "percent" = "decimal",
  local = "en-US"
) => {
  return new Intl.NumberFormat(local, {
    style,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
