export const formatCurrency = (value: number, currency?: string) => {
  return new Intl.NumberFormat("en-US", {
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
