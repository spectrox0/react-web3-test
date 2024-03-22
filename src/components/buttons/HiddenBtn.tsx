import { FCC } from "@types";
import { Button } from "primereact/button";
import React, { forwardRef, Ref, useMemo } from "react";
import { PrimeBtnProps } from "./Btn.types";

interface HiddenEyeBtnProps extends Omit<PrimeBtnProps, "icon" | "onClick"> {
  open: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HiddenEyeBtn: FCC<HiddenEyeBtnProps> = forwardRef(
  (
    { rounded = true, open, text = true, severity = "info", onClick, ...props },
    ref: Ref<Button> | undefined
  ) => {
    const icon = useMemo(
      () => (open ? "pi pi-eye" : "pi pi-eye-slash"),
      [open]
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
