import { FCC } from "@types";

interface TabProps {
  tabs: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
export const TabsMenu: FCC<TabProps> = ({ tabs, setActiveTab, activeTab }) => {
  return (
    <div className="flex gap-2 rounded-full">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`px-4 py-2 rounded-full ${
            activeTab === index
              ? "bg-primary text-white"
              : "bg-white text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
