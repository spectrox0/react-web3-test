import { FCC } from "@types";
import { copyToClipboard } from "@utils";
import { IconBtn, IconBtnProps } from "./IconBtn";

interface CopyClipboardBtnProps
  extends Omit<IconBtnProps, "onClick" | "text" | "icon"> {
  text: string;
}

export const ClipboardCopyBtn: FCC<CopyClipboardBtnProps> = ({
  text,
  ...rest
}) => {
  const handleCopy = async () => {
    try {
      await copyToClipboard(text);
    } catch (e) {
      console.error(e);
    }
  };
  return <IconBtn icon={"pi pi-copy"} onClick={handleCopy} {...rest} />;
};
