import { FCC, Icon } from "@types";
import { CustomBtn } from "./CustomBtn";
import { CustomBtnProps } from "./CustomBtn.types";

interface Props extends CustomBtnProps {
  Icon: Icon;
}
export const MethodBtn: FCC<Props> = ({
  className = "",
  color = "text",
  onClick,
  Icon,
  children,
  ...rest
}) => {
  return (
    <CustomBtn
      color={color}
      className={`flex items-center gap-1.5 font-semibold ${className}`}
      onClick={onClick}
      {...rest}
    >
      <Icon width={22} height={22} />
      {children}
    </CustomBtn>
  );
};
