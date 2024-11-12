import React from "react";

const TabListing = ({ tabs, activeTab, handleActiveTab }) => {
  return (
    <div className="w-1/4 bg-gray-100 rounded-md p-4">
      <ul className="space-y-2">
        {tabs?.map(({ label, value }, index) => (
          <li
            key={index}
            onClick={() => {
              handleActiveTab(value);
            }}
            className={`text-orange-500 font-medium cursor-pointer ${
              activeTab === value && "active-tab"
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
