import { FC } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
export const Header: FC = () => {
  return (
    <header className="border-b border-b-slate-50/10 text-white flex-col backdrop-blur-md sticky top-0 left-0 w-full">
      <nav className="flex items-center px-2 py-3">
        <ThemeSwitcher className="ml-auto" />
      </nav>
    </header>
  );
};
