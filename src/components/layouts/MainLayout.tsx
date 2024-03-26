import { Header } from "@components/Header";
import { FCC } from "@types";

export const MainLayout: FCC = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};
