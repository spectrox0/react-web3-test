import type { FC } from "react";
import { btnClassNames } from "./CustomBtn.types";
import { LinkBtnProps } from "./LinkBtn.types";

export const LinkBtn: FC<LinkBtnProps> = ({
  children,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  color = "primary",
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`
      flex gap-0.5 justify-center items-center link-btn
      font-medium py-2 outline-0 ring-0 px-3 rounded-lg
      origin-center
      bg-opacity-0
      hover:bg-opacity-10
      focus:bg-opacity-10
      ${btnClassNames[color as keyof typeof btnClassNames]}
      transition-all
      ease-in-out
      duration-200`}
    >
      {children}
    </a>
  );
};
