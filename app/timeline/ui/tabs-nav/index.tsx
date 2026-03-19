interface TabsNavProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export const TabsNav = ({ tabs, activeTab, onChange }: TabsNavProps) => {
  return (
    <nav className="w-full overflow-x-auto shrink-0">
      <ul className="flex">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`py-3 px-3.75 rounded-full text-sm font-medium ${
              tab === activeTab
                ? "text-white bg-black cursor-default"
                : "text-darkgray cursor-pointer"
            }`}
            onClick={() => onChange(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
};
