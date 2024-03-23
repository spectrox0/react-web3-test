import { FCC } from "@types";
import { copyToClipboard } from "@utils";
import { PrimeBtn } from "./Btn";
import { PrimeBtnProps } from "./Btn.types";

interface CopyClipboardBtnProps
  extends Omit<PrimeBtnProps, "onClick" | "text"> {
  text: string;
}

export const CopyClipboardBtn: FCC<CopyClipboardBtnProps> = ({
  text,
  icon = "pi pi-copy",
  ...rest
}) => {
  const handleCopy = async () => {
    try {
      await copyToClipboard(text);
    } catch (e) {
      console.error(e);
    }
  };
  return <PrimeBtn icon={icon} onClick={handleCopy} {...rest} />;
};
