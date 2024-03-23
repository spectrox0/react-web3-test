import { FCC } from "@types";
import { LinkBtn } from "./LinkBtn";
import { LinkBtnProps } from "./LinkBtn.types";

export const BlockchainExplorerBtn: FCC<LinkBtnProps> = ({
  className = "rounded-full p-1 w-7 h-7",
  ...props
}) => {
  return (
    <LinkBtn className={className} {...props}>
      <i className="text-sm text-current pi pi-external-link" />
    </LinkBtn>
  );
};
