import { FCC } from "@types";
import { FC, useState } from "react";
import { Tab, TabsMenu } from "./Tabs";

interface TabViewsProps {
  tabs: Tab[];
  views: FC[];
}
export const TabViews: FCC<TabViewsProps> = ({ tabs, views, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const View = views[activeTab];
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1">
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
