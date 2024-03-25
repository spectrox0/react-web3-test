import { FC } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Container } from "./layouts/Container";
import { TestnetNetworkSelect } from "./selects/TestnetNetwork";
export const Header: FC = () => {
  return (
    <header className="sticky left-0 top-0 w-full flex-col border-b border-b-slate-50/10 text-white backdrop-blur-md">
      <Container className="flex items-center py-3">
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher className="ml-auto" />
          <TestnetNetworkSelect />
        </div>
      </Container>
    </header>
  );
};
