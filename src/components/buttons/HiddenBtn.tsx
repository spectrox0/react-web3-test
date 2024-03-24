import { FCC } from "@types";
import React, { useMemo } from "react";
import { IconBtn, IconBtnProps } from "./IconBtn";

interface HiddenEyeBtnProps extends Omit<IconBtnProps, "icon" | "onClick"> {
  hidden: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HiddenEyeBtn: FCC<HiddenEyeBtnProps> = ({
  hidden = true,
  onClick,
  ...props
}) => {
  const icon = useMemo(() => (hidden ? "pi-eye-slash" : "pi-eye"), [hidden]);
  const handleClick = () => onClick(prev => !prev);
  return <IconBtn onClick={handleClick} icon={icon} {...props} />;
};
