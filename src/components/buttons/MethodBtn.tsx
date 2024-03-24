import { FCC, Icon } from "@types";
import { CustomBtn } from "./CustomBtn";
import { CustomBtnProps } from "./CustomBtn.types";

interface Props {
  className?: string;
  Icon: Icon;
  color?: CustomBtnProps["color"];
  onClick: () => void;
}
export const MethodBtn: FCC<Props> = ({
  className = "",
  color = "text",
  onClick,
  Icon,
  children,
}) => {
  return (
    <CustomBtn
      color={color}
      className={`flex items-center gap-1.5 font-semibold ${className}`}
      onClick={onClick}
    >
      <Icon width={22} height={22} />
      {children}
    </CustomBtn>
  );
};
