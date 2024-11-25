import React from "react";
import TabListing from "./TabListing";
import InventoryTab from "./InventoryTab";
import AdvancedTab from "./AdvancedTab";
import VariantsTab from "./VariantsTab";

const TABS = [
  { label: "Inventory", value: "inventory" },
  { label: "Variations", value: "variations" },
  { label: "Advanced", value: "advanced" },
];

const ProductDataSection = ({ formConfig, activeTab, handleActiveTab }) => {
  const renderActiveTab = () => {
    switch (activeTab) {
      case "inventory":
        return <InventoryTab formConfig={formConfig} />;
      case "variations":
        return <VariantsTab formConfig={formConfig} />;
      case "advanced":
        return <AdvancedTab formConfig={formConfig} />;
    }
  };

  return (
    <div className="product-data-section">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Product Data
        </h2>

        <div className="flex space-x-6">
          <TabListing
            tabs={TABS}
            handleActiveTab={handleActiveTab}
            activeTab={activeTab}
          />
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default ProductDataSection;
