import { ButtonHTMLAttributes } from "react";

export const btnClassNames = {
  primary: "border-blue-400 text-blue-400 bg-blue-400 fill-blue-400",
  error: "border-rose-700 text-rose-700 bg-rose-700 fill-rose-700",
  success: "border-green-500 text-green-500 bg-green-500 fill-green-700",
  text: "border-neutral-400 text-neutral-400 bg-neutral-400 fill-neutral-400",
  metamask: "border-orange-500 text-orange-500 bg-orange-500 fill-orange-500",
};
export interface CustomBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: keyof typeof btnClassNames;
  loading?: boolean;
}
