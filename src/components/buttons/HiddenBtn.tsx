import { FCC } from "@types";
import { Button } from "primereact/button";
import React, { forwardRef, Ref, useMemo } from "react";
import { PrimeBtnProps } from "./Btn.types";

interface HiddenEyeBtnProps extends Omit<PrimeBtnProps, "icon" | "onClick"> {
  hidden: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HiddenEyeBtn: FCC<HiddenEyeBtnProps> = forwardRef(
  (
    {
      rounded = true,
      hidden = true,
      text = true,
      severity = "info",
      onClick,
      ...props
    },
    ref: Ref<Button> | undefined
  ) => {
    const icon = useMemo(
      () => (hidden ? "pi pi-eye-slash" : "pi pi-eye"),
      [hidden]
    );
    const handleClick = () => onClick(prev => !prev);
    return (
      <Button
        rounded={rounded}
        severity={severity}
        text={text}
        onClick={handleClick}
        {...props}
        ref={ref}
        icon={icon}
      />
    );
  }
);
