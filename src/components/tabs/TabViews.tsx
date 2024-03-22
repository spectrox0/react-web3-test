import { FCC } from "@types";
import { FC, useState } from "react";
import { TabsMenu } from "./Tabs";

interface TabViewsProps {
  tabs: string[];
  views: FC[];
}
export const TabViews: FCC<TabViewsProps> = ({ tabs, views }) => {
  const [activeTab, setActiveTab] = useState(0);
  const View = views[activeTab];
  return (
    <section className="flex flex-col gap-4">
      <TabsMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <View />
    </section>
  );
};
