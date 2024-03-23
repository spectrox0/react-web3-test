export enum STATE_VARIATION_PERCENTAGE {
  "positive" = "positive-percentage",
  "negative" = "negative-percentage",
  "neutral" = "neutral-percentage",
}

export const percentageVariation = (value: number) => {
  if (value > 0) {
    return STATE_VARIATION_PERCENTAGE.positive;
  } else if (value < 0) {
    return STATE_VARIATION_PERCENTAGE.negative;
  } else {
    return STATE_VARIATION_PERCENTAGE.neutral;
  }
};

export const percentageSymbol = {
  [STATE_VARIATION_PERCENTAGE.positive]: "+",
  [STATE_VARIATION_PERCENTAGE.negative]: "",
  [STATE_VARIATION_PERCENTAGE.neutral]: "",
};
