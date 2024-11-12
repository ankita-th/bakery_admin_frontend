import React from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import { createRequiredValidation } from "../utils/helpers";

const AdvancedTab = ({ formConfig }) => {
  return (
    <div>
      <div className="w-full space-y-4">
        {/* update required: may be need to change field name after updation in API */}
        <CommonTextField
          label="Purchase Note"
          fieldName="purchase_note"
          placeholder="Enter Purchase Note"
          className="w-full p-2 border rounded-md"
          rules={createRequiredValidation("Purchase Note")}
          formConfig={formConfig}
          type="textarea"
          rows={4}
        />

        <CommonTextField
          label="Minimum Order Quantity"
          fieldName="minimum_order_quantity"
          placeholder="Enter Order Quantity"
          className="w-full p-2 border rounded-md"
          rules={createRequiredValidation("Minimum Order Quantity")}
          formConfig={formConfig}
        />
      </div>
    </div>
  );
};

export default AdvancedTab;
