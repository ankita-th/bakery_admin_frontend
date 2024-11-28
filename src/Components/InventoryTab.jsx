import React from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import { createRequiredValidation } from "../utils/helpers";
import CommonDateField from "../Form Fields/CommonDateField";
import CommonSelect from "../Form Fields/CommonSelect";
import { MEASURE_OPTIONS } from "../constant";
import CommonFieldArray from "./Common/CommonFieldArray";
import { SPECIAL_CHARACTERS_REGEX } from "../regex/regex";
const InventoryTab = ({ formConfig, disabled }) => {
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
  console.log(watch("sale_price_dates_from"), "assadsa");
  return (
    <div>
      <div className="w-full space-y-4">
        <CommonTextField
          label="SKU *"
          fieldName="sku"
          className="w-full p-2 rounded-md bg-[#F5F5F5] mt-2"
          rules={{
            ...createRequiredValidation("SKU"),
            pattern: {
              value: SPECIAL_CHARACTERS_REGEX,
              message: "Special characters are not allowed",
            },
          }}
          formConfig={formConfig}
          placeholder="Enter SKU"
          disabled={disabled}
        />

        <div className="grid grid-cols-2 gap-4">
          <CommonTextField
            label="Regular Price ($) *"
            fieldName="regular_price"
            className="w-full p-2 rounded-md bg-[#F5F5F5] mt-2"
            rules={{
              ...createRequiredValidation("Regular Price"),
              maxLength: {
                value: 8,
                message:
                  "Regular price must not be more than 8 digits in total",
              },
            }}
            formConfig={formConfig}
            placeholder="Enter Price of Product"
            disabled={disabled}
            isNumberOnly={true}
          />

          {/* need to add schedule sale yet */}
          <CommonTextField
            label="Sale Price ($) *"
            fieldName="sale_price"
            className="w-full p-2 rounded-md bg-[#F5F5F5] mt-2"
            rules={{
              ...createRequiredValidation("Sale Price"),
              maxLength: {
                value: 8,
                message: "Sale price must not be more than 8 digits in total",
              },
            }}
            formConfig={formConfig}
            isNumberOnly={true}
            placeholder="Enter Sale Price"
            disabled={disabled}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CommonDateField
            label="Sale Price Date From *"
            fieldName="sale_price_dates_from"
            rules={createRequiredValidation("Sale price date from")}
            formConfig={formConfig}
            className="w-full p-2 rounded-md bg-[#F5F5F5] mt-2"
            disabled={disabled}
          />
          <CommonDateField
            label="Sale Price Date To *"
            fieldName="sale_price_dates_to"
            minDate={watch("sale_price_dates_from")}
            disabled={disabled}
            rules={{
              ...createRequiredValidation("Sale price date to"),
              validate: (value) =>
                value >= watch("sale_price_dates_from") ||
                "Sale price end date must be greater than or equal to the start date",
            }}
            formConfig={formConfig}
            className="w-full p-2 rounded-md bg-[#F5F5F5] mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CommonTextField
            label="Weight *"
            disabled={disabled}
            fieldName="weight"
            className="w-full p-2 rounded-md bg-[#F5F5F5] mt-2"
            rules={createRequiredValidation("Weight")}
            formConfig={formConfig}
            placeholder="Enter Weight Of Product"
            isNumberOnly={true}
          />
          <CommonSelect
            label="Unit *"
            formConfig={formConfig}
            disabled={disabled}
            fieldName="unit"
            rules={createRequiredValidation("Unit")}
            options={MEASURE_OPTIONS}
            placeholder="Select Unit Of Product"
            className="mt-2 border-2 border-solid border-black-500 rounded"
          />
        </div>

        <div>
          <CommonFieldArray
            heading="Bulking Pricing Rules"
            disabled={disabled}
            fieldArrayName="bulking_price_rules"
            items={BULKING_PRICE_ITEMS}
            itemToAppend={BULKING_APPEND_ITEM}
            formConfig={formConfig}
            className="bg-[#F5F5F5] mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;
