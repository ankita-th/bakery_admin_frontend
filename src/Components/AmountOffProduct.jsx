import React, { useState } from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import { createRequiredValidation, generateRandomCode } from "../utils/helpers";
import FormWrapper from "../Wrappers/FormWrapper";
import CommonButton from "./Common/CommonButton";
import {
  clockIcon,
  dateIcon,
  draftIcon,
  publishIcon,
} from "../assets/Icons/Svg";
import CommonSelect from "../Form Fields/CommonSelect";
import {
  COMBINATION_OPTIONS,
  CUSTOMER_ELIGIBILITY_OPTIONS,
  CUSTOMER_SPECIFIC_OPTIONS,
  DISCOUNT_TYPE_OPTIONS,
  PURCHASE_REQUIREMENT_OPTIONS,
  today,
} from "../constant";
import RadioGroup from "../Form Fields/RadioGroup";
import CheckboxGroup from "../Form Fields/CheckboxGroup";
import CommonDateField from "../Form Fields/CommonDateField";

const AmountOffProduct = ({ formConfig, onSubmit }) => {
  const { watch, setValue } = formConfig;
  const [showEndDate, setShowEndDate] = useState(false);
  console.log(watch(), "form field");
  const handleGenerateCode = () => {
    const randommCode = generateRandomCode();
    setValue("code", randommCode);
  };
  // for minimum purchase value or minimum quantity value
  const renderCommonTextField = (label, fieldName) => (
    <CommonTextField
      label={label}
      fieldName={fieldName}
      formConfig={formConfig}
      className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
      placeholder="0.00"
      isNumberOnly={true} // update required add isDecimalOnly here
    />
  );
  const toggleEndDate = () => {
    setShowEndDate((prev) => !prev);
    setValue("end_date", "");
  };
  return (
    <FormWrapper formConfig={formConfig} onSubmit={onSubmit}>
      <div className="flex gap-6">
        <div className="flex flex-col gap-8 w-3/4">
          {/* first */}
          <div
            className="text-[#FF6D2F] underline cursor-pointer"
            onClick={handleGenerateCode}
          >
            Generate Random Code
          </div>

          <CommonTextField
            label="Discount Code *"
            fieldName="code"
            rules={createRequiredValidation("Discount code")}
            formConfig={formConfig}
            className="px-4 py-2 w-full rounded-lg"
            placeholder="Enter Code"
          />

          {/* second */}

          <div className="bg-white p-6 rounded-lg">
            <CommonSelect
              label="Discount Type *"
              formConfig={formConfig}
              options={DISCOUNT_TYPE_OPTIONS}
              rules={createRequiredValidation("Discount type")}
              fieldName="discount_types"
              selectType="react-select"
            />

            <CommonTextField
              label="Discount Value *"
              fieldName="discount_value"
              rules={createRequiredValidation("Discount value")}
              formConfig={formConfig}
              className="px-4 py-2 w-full rounded-lg"
              icon={watch("discount_types")?.value === "percentage" && "%"}
              isNumberOnly={true} // update required: may be need to update into isDecimal
            />
            <div>
              <div className="mb-4">Applies To</div>
              <div className="mb-4">
                <input
                  type="select"
                  className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search Products"
                  className="px-4 py-2 w-4/5 rounded-lg bg-[#F5F5F5]"
                />
                <button
                  type="button"
                  className="w-1/5 bg-[#FF6D2F] text-[#FFFFFF] rounded-lg"
                >
                  Search Products
                </button>
              </div>
            </div>
          </div>

          {/* third */}

          <div className="bg-white p-6 rounded-lg">
            <RadioGroup
              className="flex gap-4"
              label="Minimum Purchase Requirements"
              fieldName="minimum_purchase_requirement"
              formConfig={formConfig}
              //   need to update these options , need to confirm from backend
              options={PURCHASE_REQUIREMENT_OPTIONS}
              rules={createRequiredValidation("Minimum purchase requirement")}
            />
            {watch("minimum_purchase_requirement") === "minimum_purchase" &&
              renderCommonTextField(
                "Minimum Purchase Value *",
                "minimum_purchase_value"
              )}
            {watch("minimum_purchase_requirement") === "minimum_quantity" &&
              renderCommonTextField(
                "Minimum Quantity Of Items *",
                "maximum_usage_value"
              )}

            <div>Applies only to selected collections.</div>
          </div>

          {/* Fourth */}

          <div className="bg-white p-6 rounded-lg">
            <RadioGroup
              className="flex gap-4"
              label="Customer eligibility"
              fieldName="customer_eligibility"
              formConfig={formConfig}
              //   need to update these options , need to confirm from backend
              options={CUSTOMER_ELIGIBILITY_OPTIONS}
              rules={createRequiredValidation("Customer eligibility")}
            />
            {watch("customer_eligibility") === "specific_customer" && (
              <CommonSelect
                formConfig={formConfig}
                label="Customer Specification"
                fieldName="customer_specification"
                options={CUSTOMER_SPECIFIC_OPTIONS}
                rules={createRequiredValidation("Customer specification")}
                placeholder="Select Customer Specification"
                className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
              />
            )}

            <div>Applies only to selected collections.</div>
          </div>

          {/* fifth */}

          <div className="bg-white p-6 rounded-lg">
            <div className="mb-4">
              <div className="text-[#3E3232] mb-1">Combinations</div>
              <CheckboxGroup
                formConfig={formConfig}
                label="This product discount can be combined with:"
                options={COMBINATION_OPTIONS}
                fieldName="combination"
                rules={createRequiredValidation("Combination")}
                className="flex gap-10"
              />
              <div className="text-[#969696]">
                This product discount can be combined with:
              </div>
            </div>
          </div>

          {/* sixth */}

          <div className="bg-white p-6 rounded-lg">
            <div className="mb-4">Active Dates</div>
            <div className="flex gap-4 mb-4">
              <CommonDateField
                label="Start Date *"
                className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
                minDate={today}
                fieldName="start_date"
                formConfig={formConfig}
              />
              <CommonDateField
                type="time"
                label="Start Time *"
                className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
                fieldName="start_time"
                formConfig={formConfig}
              />
            </div>
            <div
              className="text-[#FF6D2F] underline cursor-pointer"
              onClick={toggleEndDate}
            >
              {showEndDate ? "Remove End Date" : "Set End Date"}
            </div>

            {showEndDate && (
              <CommonDateField
                label="End Date *"
                formConfig={formConfig}
                fieldName="end_date"
                minDate={watch("start_date")}
                rules={{
                  ...createRequiredValidation("End date"),
                  validate: (value) =>
                    value >= watch("start_date") ||
                    "End date must be greater than or equal to the start date",
                }}
              />
            )}
          </div>
        </div>
        {/* sidebar */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <CommonButton
              text="Draft"
              name="draft"
              className="px-4 py-2 bg-[#E4E4E4] rounded-lg orange_btn"
              type="submit"
              icon={draftIcon}
            />
            <CommonButton
              text="Save Discount"
              name="save"
              className="px-4 py-2 bg-[#E4E4E4] rounded-lg orange_btn"
              type="submit"
              icon={publishIcon}
            />
          </div>
          <div className="bg-white p-5 rounded-lg">
            <div className="border-b mb-6 font-semibold	">Summary</div>
            <div className="mb-6 font-semibold">DiscountCodee</div>
            <div className="mb-4">
              <div className="mb-2">Type and method</div>
              <div className="text-nowrap text-[#969696]">
                - Amount off products Code
              </div>
              <div className="text-nowrap text-[#969696]">- Code</div>
            </div>
            <div className="mb-4">
              <div className="mb-2">Details</div>
              <div className="text-nowrap text-[#969696]">
                - For Online Store
              </div>
              <div className="text-nowrap text-[#969696]">
                - No Usage Limits
              </div>
              <div className="text-nowrap text-[#969696]">
                - Cant Combine with other
              </div>
              <div className="text-nowrap text-[#969696]">- Discounts</div>
              <div className="text-nowrap text-[#969696]">- Active today</div>
            </div>

            <div className="mb-4">
              <div className="mb-2">Performance</div>
              <div className="text-nowrap text-[#969696]">
                - Discount is not active yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default AmountOffProduct;
