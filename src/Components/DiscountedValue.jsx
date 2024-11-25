import React, { useEffect } from "react";
import RadioGroup from "../Form Fields/RadioGroup";
import { DISCOUNTED_VALUE_OPTIONS } from "../constant";
import CommonTextField from "../Form Fields/CommonTextField";
import { createRequiredValidation } from "../utils/helpers";

const DiscountedValue = ({ formConfig }) => {
  const { watch, setValue } = formConfig;
  const { discount_types } = watch();

  useEffect(() => {
    if (discount_types === "free") {
      setValue("discount_value", "");
    }
  }, [discount_types]);

  const showValueField = () => {
    return (
      watch("discount_types") === "amount_off_each" ||
      watch("discount_types") === "percentage"
    );
  };
  return (
    <div className="bg-white p-6 rounded-lg">
      <RadioGroup
        className="flex gap-4"
        label="At A Discounted value"
        fieldName="discount_types"
        formConfig={formConfig}
        //   need to update these options , need to confirm from backend
        options={DISCOUNTED_VALUE_OPTIONS}
        rules={createRequiredValidation("Discount type")}
      />{" "}
      {showValueField() && (
        <CommonTextField
          formConfig={formConfig}
          label="Discount Value"
          fieldName="discount_value"
          rules={createRequiredValidation("Discount value")}
          placeholder="0.00"
          isNumberOnly={true}
          icon={watch("discount_types") === "percentage" && "%"}
        />
      )}
    </div>
  );
};

export default DiscountedValue;
