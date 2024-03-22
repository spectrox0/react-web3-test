import { Header } from "@components/Header";
import { FCC } from "@types";

export const MainLayout: FCC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
    </div>
  );
};
