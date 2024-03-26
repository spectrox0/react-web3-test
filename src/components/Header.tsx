import { FC } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Container } from "./layouts/Container";
import { TestnetNetworkSelect } from "./selects/TestnetNetwork";
export const Header: FC = () => {
  return (
    <header
      className="sticky left-0 top-0 z-50 w-full flex-col border-b border-b-gray-50/10 bg-white/10
    text-white shadow-md backdrop-blur-md dark:border-b dark:bg-slate-900/10 dark:shadow-none
    "
    >
      <Container className="flex items-center py-3">
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher className="ml-auto" />
          <TestnetNetworkSelect />
        </div>
      </Container>
    </header>
  );
};
