import { FCC } from "@types";

interface TabProps {
  tabs: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
export const TabsMenu: FCC<TabProps> = ({ tabs, setActiveTab, activeTab }) => {
  return (
    <div className="inline-flex flex-wrap rounded-full border-2 border-gray-600 self-start p-0.5">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`px-4 py-2 capitalize rounded-full transition-[bg] duration-75 ease-in-out font-semibold ${
            activeTab === index ? "text-white bg-blue-500" : "text-gray-30"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
