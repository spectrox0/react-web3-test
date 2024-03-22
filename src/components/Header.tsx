import { FC } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { TestnetNetworkSelect } from "./selects/TestnetNetwork";
export const Header: FC = () => {
  return (
    <header className="border-b border-b-slate-50/10 text-white flex-col backdrop-blur-md sticky top-0 left-0 w-full">
      <nav className="flex items-center px-2 py-3">
        <div className="ml-auto flex gap-2">
          <TestnetNetworkSelect />
          <ThemeSwitcher className="ml-auto" />
        </div>
      </nav>
    </header>
  );
};
