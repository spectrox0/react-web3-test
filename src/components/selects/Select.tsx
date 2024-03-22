import { Dropdown } from "primereact/dropdown";
import { FC } from "react";
import { SelectProps } from "./Select.types";

export const CustomSelect: FC<SelectProps> = ({
  className = "w-full md:w-14rem",
  ...props
}) => {
  return <Dropdown className={className} {...props} />;
};
