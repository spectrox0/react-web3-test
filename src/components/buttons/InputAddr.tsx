import { InputText, InputTextProps } from "primereact/inputtext";
import { FC } from "react";

type InputAddrProps = InputTextProps;
export const InputAddr: FC<InputAddrProps> = ({
  value,
  placeholder = "Token address",
  onChange,
  className = "min-w-16 max-w-full flex-1",
  disabled = false,
  ...rest
}) => {
  return (
    <InputText
      className={className}
      value={value}
      placeholder={placeholder}
      style={{ flex: 1, minWidth: "10rem", maxWidth: "100%" }}
      disabled={disabled}
      onChange={onChange}
      {...rest}
    />
  );
};
