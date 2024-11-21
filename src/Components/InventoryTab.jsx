import React from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import { createRequiredValidation } from "../utils/helpers";
import CommonDateField from "../Form Fields/CommonDateField";
import CommonSelect from "../Form Fields/CommonSelect";
import { MEASURE_OPTIONS } from "../constant";
import CommonFieldArray from "./Common/CommonFieldArray";
const InventoryTab = ({ formConfig }) => {
  const { watch } = formConfig;
  console.log(watch("sale_price_dates_to"), "form");
  const BULKING_PRICE_ITEMS = [
    {
      fieldName: "quantity_from",
      placeholder: "Enter Quantity From",
      label: "Quantity From",
      isRequired: true,
      isNumberOnly: true,
    },
    {
      fieldName: "quantity_to",
      placeholder: "Enter Quantity To",
      label: "Quantity To",
      isRequired: true,
      isNumberOnly: true,
    },
    {
      fieldName: "price",
      placeholder: "Enter Price",
      label: "Price ($)",
      isRequired: true,
    },
  ];
  const BULKING_APPEND_ITEM = {
    quantity_from: null,
    quantity_to: null,
    price: "",
  };
  return (
    <div>
      <div className="w-3/4 space-y-4">
        <CommonTextField
          label="SKU"
          fieldName="sku"
          className="w-full p-2 border rounded-md"
          //   rules={createRequiredValidation("SKU")}
          formConfig={formConfig}
        />

        <div className="grid grid-cols-2 gap-4">
          <CommonTextField
            label="Regular Price ($) *"
            fieldName="regular_price"
            className="w-full p-2 border rounded-md"
            rules={createRequiredValidation("Regular Price")}
            formConfig={formConfig}
            placeholder="Enter Price of Product"
          />

          {/* need to add schedule sale yet */}
          <CommonTextField
            label="Sale Price ($) *"
            fieldName="sale_price"
            className="w-full p-2 border rounded-md"
            rules={createRequiredValidation("Sale Price")}
            formConfig={formConfig}
            placeholder="Enter Sale Price"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CommonDateField
            label="Sale Price Date From *"
            fieldName="sale_price_dates_from"
            rules={createRequiredValidation("Sale price date from")}
            formConfig={formConfig}
            className="w-full p-2 border rounded-md"
          />
          <CommonDateField
            label="Sale Price Date To *"
            fieldName="sale_price_dates_to"
            minDate={watch("sale_price_dates_from")}
            rules={{
              ...createRequiredValidation("Sale price date to"),
              validate: (value) =>
                value >= watch("sale_price_dates_from") ||
                "Sale price end date must be greater than or equal to the start date",
            }}
            formConfig={formConfig}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CommonTextField
            label="Weight *"
            fieldName="weight"
            className="w-full p-2 border rounded-md"
            rules={createRequiredValidation("Weight")}
            formConfig={formConfig}
            placeholder="Enter Weight Of Product"
            isNumberOnly={true}
          />
          <CommonSelect
            label="Unit *"
            formConfig={formConfig}
            fieldName="unit"
            options={MEASURE_OPTIONS}
            placeholder="Select Unit Of Product"
          />
        </div>

        <div>
          <CommonFieldArray
            heading="Bulking Pricing Rules"
            fieldArrayName="bulking_price_rules"
            items={BULKING_PRICE_ITEMS}
            itemToAppend={BULKING_APPEND_ITEM}
            formConfig={formConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;
