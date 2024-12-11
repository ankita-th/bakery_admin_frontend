import React, { Fragment, useState } from "react";
import { useFieldArray } from "react-hook-form";
import VariantAccordion from "./Common/VariantAccordion";
import Checkbox from "../Form Fields/Checkbox";
import CommonTextField from "../Form Fields/CommonTextField";
import { createRequiredValidation } from "../utils/helpers";
import CommonSelect from "../Form Fields/CommonSelect";
import { BACKDOOR_OPTIONS, MEASURE_OPTIONS, today } from "../constant";
import CommonButton from "./Common/CommonButton";
import { plusIcon } from "../assets/Icons/Svg";
import CommonDateField from "../Form Fields/CommonDateField";
import { SPECIAL_CHARACTERS_REGEX } from "../regex/regex";
const accordionData = [
  {
    title:
      "Are there any special discounts or promotions available during the event?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu.",
  },
  {
    title: "What are the dates and locations for the product launch events?",
    content: "Content about dates and locations of product launch events.",
  },
  {
    title: "Can I bring a guest with me to the product launch event?",
    content: "Content about bringing a guest to the event.",
  },
  {
    title: "Can I purchase the product at the launch event?",
    content: "Content about purchasing the product at the event.",
  },
];
const itemToAppend = {
  sku: "",
  regular_price: "",
  sale_price: "",
  sale_price_dates_from: "",
  sale_price_dates_to: "",
  quantity: null,
  weight: "",
  unit: "",
  enabled: false,
  managed_stock: false,
  allow_backorders: "",
  description: "",
};

const VariantsTab = ({ formConfig, disabled }) => {
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = formConfig;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  console.log(openIndex, "openIndex");
  return (
    <div className="font-[sans-serif] rounded-lg w-full">
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="p-2 w-full border-b my-2">
            <VariantAccordion
              index={index}
              openIndex={openIndex}
              handleToggle={handleToggle}
              remove={remove}
              watch={watch}
              isViewOnly={disabled}
              // heading={
              //   <div className="flex items-center justify-between mb-4">
              //     <select
              //       className="border border-gray-300 text-sm text-gray-700 rounded-lg p-2"
              //       disabled={true}
              //     >
              //       <option value="1">100 gm</option>
              //     </select>
              //     <div className="flex gap-2">
              //       <button
              //         type="button"
              //         className="text-blue-600 text-sm font-medium"
              //       >
              //         Edit
              //       </button>
              //       {watch("variants").length > 1 && (
              //         <button
              //           className="text-red-600 text-sm font-medium"
              //           onClick={() => remove(index)}
              //         >
              //           Remove
              //         </button>
              //       )}
              //     </div>
              //   </div>
              // }
            >
              {/* accordion data will be passed as children */}
              <div className="flex">
                <div className="flex gap-4 mb-6 flex-col w-1/5">
                  <Checkbox
                    fieldName={`variants.${index}.enabled`}
                    label="Enabled"
                    formConfig={formConfig}
                    disabled={disabled}
                    customError={
                      errors?.["variants"]?.[index]?.["enabled"]?.message
                    }
                  />
                  <Checkbox
                    fieldName={`variants.${index}.managed_stock`}
                    label="Manage Stock ?"
                    disabled={disabled}
                    formConfig={formConfig}
                    customError={
                      errors?.["variants"]?.[index]?.["managed_stock"]?.message
                    }
                  />
                </div>

                <div className="mb-6 flex-1 w-4/5 space-y-4">
                  <div className="w-full">
                    <CommonTextField
                      label="SKU"
                      disabled={disabled}
                      fieldName={`variants.${index}.sku`}
                      formConfig={formConfig}
                      rules={{
                        ...createRequiredValidation("SKU"),
                        pattern: {
                          value: SPECIAL_CHARACTERS_REGEX,
                          message: "Special characters are not allowed",
                        },
                      }}
                      placeholder="Enter SKU"
                      customError={
                        errors?.["variants"]?.[index]?.["sku"]?.message
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500 mt-2"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <CommonTextField
                        label="Regular Price ($)"
                        fieldName={`variants.${index}.regular_price`}
                        placeholder="Enter Regular Price"
                        formConfig={formConfig}
                        disabled={disabled}
                        rules={createRequiredValidation("Regular price")}
                        isDecimal={true}
                        customError={
                          errors?.["variants"]?.[index]?.["regular_price"]
                            ?.message
                        }
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all mt-2"
                      />
                    </div>
                    <div className="w-1/2">
                      <CommonTextField
                        label="Sale Price ($)"
                        fieldName={`variants.${index}.sale_price`}
                        placeholder="Enter Sale Price"
                        formConfig={formConfig}
                        disabled={disabled}
                        rules={createRequiredValidation("Sale price")}
                        isDecimal={true}
                        customError={
                          errors?.["variants"]?.[index]?.["sale_price"]?.message
                        }
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all mt-2"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <CommonDateField
                        formConfig={formConfig}
                        label="Sale Price Dates From"
                        fieldName={`variants.${index}.sale_price_dates_from`}
                        rules={createRequiredValidation()}
                        customError={
                          errors?.["variants"]?.[index]?.[
                            "sale_price_dates_from"
                          ]?.message
                        }
                        disabled={disabled}
                        minDate={today}
                        className="w-full bg-gray-100 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <CommonDateField
                        formConfig={formConfig}
                        label="Sale Price Dates To"
                        disabled={disabled}
                        fieldName={`variants.${index}.sale_price_dates_to`}
                        minDate={watch(
                          `variants.${index}.sale_price_dates_from`
                        )}
                        customError={
                          errors?.["variants"]?.[index]?.["sale_price_dates_to"]
                            ?.message
                        }
                        rules={{
                          ...createRequiredValidation(),
                          validate: (value) =>
                            value >=
                              watch(
                                `variants.${index}.sale_price_dates_from`
                              ) ||
                            "End date must be greater than or equal to the start date",
                        }}
                        className="w-full bg-gray-100 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex gap-4 mb-2">
                  <div className="flex-1">
                    <CommonTextField
                      label="Stock Quantity"
                      fieldName={`variants.${index}.quantity`}
                      disabled={disabled}
                      placeholder="Enter Stock Quantity"
                      rules={{
                        ...createRequiredValidation("Stock quantity"),
                        maxLength: {
                          value: 8,
                          message: "Stock quantity cannot exceed 8 digits",
                        },
                        minLength: {
                          value: 0,
                          message: "Stock quantity must be greater than 0",
                        },
                      }}
                      isDecimal={true}
                      formConfig={formConfig}
                      customError={
                        errors?.["variants"]?.[index]?.["quantity"]?.message
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500 mt-2"
                    />
                  </div>
                  <div className="flex-1">
                    <CommonSelect
                      label="Allow Backorders?"
                      fieldName={`variants.${index}.allow_backorders`}
                      placeholder="Select"
                      rules={createRequiredValidation("Allow backdors")}
                      disabled={disabled}
                      // update required: need to update the values of these options
                      options={BACKDOOR_OPTIONS}
                      selectType="react-select"
                      formConfig={formConfig}
                      customError={
                        errors?.["variants"]?.[index]?.["allow_backorders"]
                          ?.message
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <CommonTextField
                      label="Weight"
                      disabled={disabled}
                      formConfig={formConfig}
                      isDecimal={true}
                      fieldName={`variants.${index}.weight`}
                      rules={createRequiredValidation("Weight")}
                      placeholder="Enter Weight of product"
                      customError={
                        errors?.["variants"]?.[index]?.["weight"]?.message
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500 mt-2"
                    />
                  </div>
                  <div className="flex-1">
                    <CommonSelect
                      label="Unit"
                      disabled={disabled}
                      fieldName={`variants.${index}.unit`}
                      rules={createRequiredValidation("Unit")}
                      // update required: need to update the values of these options
                      options={MEASURE_OPTIONS}
                      placeholder="Select Unit Of Product"
                      selectType="react-select"
                      formConfig={formConfig}
                      customError={
                        errors?.["variants"]?.[index]?.["unit"]?.message
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <CommonTextField
                  label="Description"
                  disabled={disabled}
                  fieldName={`variants.${index}.description`}
                  type="textarea"
                  rows={4}
                  formConfig={formConfig}
                  className="rounded-lg mt-2 w-full bg-[#F5F5F5]"
                />
              </div>
              {/* accordion data will be passed as children */}
            </VariantAccordion>
          </div>
        </Fragment>
      ))}
      {!disabled && (
        <CommonButton
          text="Add Variant"
          icon={plusIcon}
          onClick={() => {
            append(itemToAppend);
          }}
          type="button"
          className="add-row-button"
        />
      )}
    </div>
  );
};

export default VariantsTab;
