import { useTheme } from "@hooks";
import { FC } from "react";
import { IconBtn } from "./buttons/IconBtn";

interface Props {
  className?: string;
  id?: string;
}
export const ThemeSwitcher: FC<Props> = ({
  className,
  id = "theme-switch",
}) => {
  const { theme, toggleTheme } = useTheme();
  const iconClassName = theme === "light" ? "pi-moon" : "pi-sun";
  return (
    <IconBtn
      id={id}
      icon={iconClassName}
      className={className}
      onClick={toggleTheme}
    />
  );
};
