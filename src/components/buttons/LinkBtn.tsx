import type { FC } from "react";
import { LinkBtnProps } from "./LinkBtn.types";

export const LinkBtn: FC<LinkBtnProps> = ({
  children,
  href,
  target = "_blank",
  rel = "noreferrer",
  color = "text",
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`
      border border-${color} flex gap-0.5 justify-center items-center link-btn 
      text-sm font-medium py-2 outline-0 ring-0 px-3 rounded-lg
      bg-transparent [&:not(:disabled):active]:scale-[0.97]
      origin-center
      transition-all
       ease-in-out
        duration-200`}
    >
      {children}
    </a>
  );
};
