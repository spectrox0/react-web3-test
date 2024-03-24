import { useModal } from "@hooks/useModal";
import { FCC } from "@types";
import { CustomBtn } from "./CustomBtn";
import { CustomBtnProps } from "./CustomBtn.types";

type SendTokenBtnProps = Omit<CustomBtnProps, "onClick"> & {
  text?: string;
};
export const SendTokenBtn: FCC<SendTokenBtnProps> = ({
  className = "font-semibold text-medium border-2 ml-auto self-end",
  text = "Send Token",
}) => {
  const { invoke } = useModal();
  const handleClick = async () => {
    await invoke("Send Token");
  };
  return (
    <CustomBtn onClick={handleClick} className={className}>
      <i className="pi pi-send" />
      {text}
    </CustomBtn>
  );
};
