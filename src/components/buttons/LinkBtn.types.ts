import { AnchorHTMLAttributes, ReactNode } from "react";

export interface LinkBtnProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}
