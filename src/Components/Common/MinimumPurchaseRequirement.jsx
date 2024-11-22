import React, { useEffect } from "react";
import RadioGroup from "../../Form Fields/RadioGroup";
import { PURCHASE_REQUIREMENT_OPTIONS } from "../../constant";
import { createRequiredValidation } from "../../utils/helpers";
import CommonTextField from "../../Form Fields/CommonTextField";

const MinimumPurchaseRequirement = ({ formConfig }) => {
  const { watch, setValue } = formConfig;
  const {
    minimum_purchase_requirement,
    minimum_purchase_value,
    maximum_usage_value,
  } = watch();
  useEffect(() => {
    if (minimum_purchase_requirement === "minimum_quantity") {
      setValue("minimum_purchase_value", "");
    } else if (minimum_purchase_requirement === "minimum_purchase") {
      setValue("minimum_quantity_value", "");
    }
  }, [minimum_purchase_requirement]);
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

  return (
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
          "minimum_quantity_value"
        )}

      <div>Applies only to selected collections.</div>
    </div>
  );
};

export default MinimumPurchaseRequirement;
