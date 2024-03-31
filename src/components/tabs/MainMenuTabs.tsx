import { TokenViews } from "@components/views/TokensView";
import { TransactionsView } from "@components/views/TransactionsView";
import { TabViews } from "./TabViews";

const tabs = [
  { title: "Tokens", id: "tab-tokens" },
  { title: "Transactions", id: "tab-transaction" },
];
const views = [TokenViews, TransactionsView];
export const MainMenuTabs: React.FC = () => {
  return <TabViews tabs={tabs} views={views} />;
};
