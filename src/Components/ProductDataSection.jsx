import React from "react";
import TabListing from "./TabListing";
import InventoryTab from "./InventoryTab";
import AdvancedTab from "./AdvancedTab";
import VariantsTab from "./VariantsTab";
import { T } from "../utils/languageTranslator";

const TABS = [
  { label: "Inventory", value: "inventory" },
  { label: "Variations", value: "variations" },
  { label: "Advanced", value: "advanced" },
];

const ProductDataSection = ({
  formConfig,
  activeTab,
  handleActiveTab,
  disabled = false,
}) => {
  // const renderActiveTab = () => {
  //   switch (activeTab) {
  //     case "inventory":
  //       return <InventoryTab formConfig={formConfig} disabled={disabled} />;
  //     case "variations":
  //       return <VariantsTab formConfig={formConfig} disabled={disabled} />;
  //     case "advanced":
  //       return <AdvancedTab formConfig={formConfig} disabled={disabled} />;
  //   }
  // };
  return (
    <div className="product-data-section border">
      <div className="w-full mx-auto p-4 bg-white rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {T["product_data"]}
        </h2>

        <div className="flex space-x-4">
          <TabListing
            tabs={TABS}
            handleActiveTab={handleActiveTab}
            activeTab={activeTab}
          />
          {/* {renderActiveTab()} */}
          <div
            className={`inventory ${activeTab == "inventory" ? "" : "hidden"}`}
          >
            <InventoryTab formConfig={formConfig} disabled={disabled} />
          </div>
          <div
            className={`variations ${
              activeTab === "variations" ? "" : "hidden"
            }`}
          >
            <VariantsTab formConfig={formConfig} disabled={disabled} />
          </div>
          <div
            className={`advanced ${activeTab === "advanced" ? "" : "hidden"}`}
          >
            <AdvancedTab formConfig={formConfig} disabled={disabled} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDataSection;
