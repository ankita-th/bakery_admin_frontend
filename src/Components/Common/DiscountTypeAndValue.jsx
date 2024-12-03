import React from "react";
import CommonSelect from "../../Form Fields/CommonSelect";
import CommonTextField from "../../Form Fields/CommonTextField";
import { createRequiredValidation } from "../../utils/helpers";
import { DISCOUNT_TYPE_OPTIONS } from "../../constant";

const DiscountTypeAndValue = ({ formConfig }) => {
  const { watch } = formConfig;
  return (
    <div>
      <CommonSelect
        label="Discount Type *"
        formConfig={formConfig}
        options={DISCOUNT_TYPE_OPTIONS}
        rules={createRequiredValidation("Discount type")}
        fieldName="discount_types"
        selectType="react-select"
        className="px-4 py-2 mb-4 w-full rounded-lg bg-[#F5F5F5]"
        placeholder="Select type"
      />

      <CommonTextField
        label="Discount Value *"
        fieldName="discount_value"
        rules={{
          ...createRequiredValidation("Discount value"),
          min: {
            value: 0,
            message: "Discount value must be greater 0",
          },
          maxLength: {
            value: 8,
            message: "Discount value must not exceed 8 digits",
          },
        }}
        formConfig={formConfig}
        className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
        icon={watch("discount_types")?.value === "percentage" && "%"}
        isNumberOnly={true} // update required: may be need to update into isDecimal
      />
    </div>
  );
};

export default DiscountTypeAndValue;
