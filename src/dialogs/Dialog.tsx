import { Dialog, DialogProps } from "primereact/dialog";
import { FC } from "react";

type Props = DialogProps;

export const CustomDialog: FC<Props> = ({
  visible,
  onHide,
  header,
  className = "",
  children,
  breakpoints = { "960px": "75vw" },
  ...rest
}) => {
  return (
    <Dialog
      className={`w-[50vw] ${className}`}
      header={header}
      visible={visible}
      onHide={onHide}
      breakpoints={breakpoints}
      {...rest}
    >
      {children}
    </Dialog>
  );
};
