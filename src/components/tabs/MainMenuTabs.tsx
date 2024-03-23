import { TokenViews } from "@components/views/TokensView";
import { TransactionsView } from "@components/views/TransactionsView";
import { TabViews } from "./TabViews";

const tabs = ["Tokens", "Transactions"];
const views = [TokenViews, TransactionsView];
export const MainMenuTabs: React.FC = () => {
  return <TabViews tabs={tabs} views={views} />;
};
