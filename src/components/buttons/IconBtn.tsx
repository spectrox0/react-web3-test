import { FCC } from "@types";
import { CustomBtn } from "./CustomBtn";
import { CustomBtnProps } from "./CustomBtn.types";

export interface IconBtnProps extends CustomBtnProps {
  icon: string;
  classNameIcon?: string;
}
export const IconBtn: FCC<IconBtnProps> = ({
  icon,
  className = "w-10 h-10 text-base",
  classNameIcon = "text-lg",
  ...rest
}) => {
  return (
    <CustomBtn className={className} {...rest}>
      <i className={`${classNameIcon} pi ${icon}`} />
    </CustomBtn>
  );
};
