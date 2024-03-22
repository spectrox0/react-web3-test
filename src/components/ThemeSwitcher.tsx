import { useTheme } from "@hooks";
import { FC } from "react";

interface Props {
  className?: string;
}
export const ThemeSwitcher: FC<Props> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const iconClassName = theme === "light" ? "pi-moon" : "pi-sun";
  return (
    <button
      type="button"
      className={`flex border-1 w-2rem h-2rem p-1 rounded-full align-center justify-center ${className}`}
      onClick={toggleTheme}
    >
      <i className={`dark:text-white pi ${iconClassName}`} />
    </button>
  );
};
