import { useTheme } from "@hooks";
import { FC } from "react";
import { IconBtn } from "./buttons/IconBtn";

interface Props {
  className?: string;
}
export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const iconClassName = theme === "light" ? "pi-moon" : "pi-sun";
  return <IconBtn icon={iconClassName} className={className} onClick={toggleTheme} />;
};
