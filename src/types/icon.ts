import { FC } from "react";

export type Icon<T = unknown> = FC<
  Partial<
    Record<"width" | "height", number> & { color?: string; className?: string }
  > &
    T
>;
