import { FCC } from "@types";
import { FC, useState } from "react";
import { TabsMenu } from "./Tabs";

interface TabViewsProps {
  tabs: string[];
  views: FC[];
}
export const TabViews: FCC<TabViewsProps> = ({ tabs, views, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const View = views[activeTab];
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-1 flex-wrap">
        <TabsMenu
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {children}
      </div>
      <View />
    </section>
  );
};
