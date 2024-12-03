import React from "react";
import { CUSTOMER_BUYS_OPTIONS } from "../constant";
import { createRequiredValidation } from "../utils/helpers";
import RadioGroup from "../Form Fields/RadioGroup";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonTextField from "../Form Fields/CommonTextField";

const CustomerBuys = ({ formConfig }) => {
  const { watch } = formConfig;
  console.log(watch("customer_buy_types"), "customer_buy_types");
  return (
    <div className="bg-white p-6 rounded-lg">
      <RadioGroup
        className="flex gap-4"
        label="Customer Buys"
        fieldName="customer_buy_types"
        formConfig={formConfig}
        options={CUSTOMER_BUYS_OPTIONS}
        rules={createRequiredValidation("")}
      />
      <div className="items-section">
        <CommonSelect
          label="Any Items From"
          selectType="react-select"
          formConfig={formConfig}
          fieldName=""
          rules={createRequiredValidation("")}
        />
        <div className="quantity">
          <CommonTextField
            label="Quantity"
            placeholder="Enter Quantity"
            isNumberOnly={true}
            fieldName="buy_products_quantity"
            rules={createRequiredValidation("Quantity is required")}
            formConfig={formConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerBuys;
