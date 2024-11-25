import React from "react";

const TabListing = ({ tabs, activeTab, handleActiveTab }) => {
  return (
    <div className="w-1/5 bg-gray-100 rounded-md p-4">
      <ul className="space-y-2">
        {tabs?.map(({ label, value }, index) => (
          <li
            key={index}
            onClick={() => {
              handleActiveTab(value);
            }}
            className={`text-black font-medium cursor-pointer py-1 px-2 rounded-lg ${
              activeTab === value && "bg-white text-orange-500"
            }`} // adding class for actve tab
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabListing;
