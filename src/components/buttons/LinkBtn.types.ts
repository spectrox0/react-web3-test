import { AnchorHTMLAttributes } from "react";
import { btnClassNames } from "./CustomBtn.types";

export type LinkBtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  color?: keyof typeof btnClassNames;
};
