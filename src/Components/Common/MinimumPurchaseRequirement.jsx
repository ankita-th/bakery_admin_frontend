import React, { useEffect } from "react";
import RadioGroup from "../../Form Fields/RadioGroup";
import { PURCHASE_REQUIREMENT_OPTIONS } from "../../constant";
import { createRequiredValidation } from "../../utils/helpers";
import CommonTextField from "../../Form Fields/CommonTextField";
import { useLocation } from "react-router-dom";

const MinimumPurchaseRequirement = ({ formConfig }) => {
  const location = useLocation();
  console.log(location, "this is location");
  const { watch, setValue, clearErrors } = formConfig;
  const {
    minimum_purchase_requirement,
    minimum_purchase_value,
    maximum_usage_value,
  } = watch();
  useEffect(() => {
    if (minimum_purchase_requirement === "minimum_quantity") {
      setValue("minimum_purchase_value", "");
      clearErrors("minimum_purchase_value");
    } else if (minimum_purchase_requirement === "minimum_purchase") {
      setValue("minimum_quantity_value", "");
      clearErrors("minimum_quantity_value");
    }
  }, [minimum_purchase_requirement]);
  // for minimum purchase value or minimum quantity value
  const renderCommonTextField = (label, fieldName) => (
    <CommonTextField
      label={`${label} *`}
      fieldName={fieldName}
      formConfig={formConfig}
      className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
      placeholder="0.00"
      rules={{
        ...createRequiredValidation(label),
        min: {
          value: 0,
          message: `${label} value must be greater than 0`,
        },
        maxLength: {
          value: 8,
          message: `${label} value must not exceed 8 digits`,
        },
      }}
      isNumberOnly={true} // update required add isDecimalOnly here
    />
  );
  const shouldShowText = (value) => {
    return value === "minimum_quantity" || value === "minimum_purchase";
  };
  console.log(watch("minimum_purchase_requirement"))

  return (
    <div className="bg-white p-6 rounded-lg">
      <RadioGroup
        className="flex gap-4"
        label="Minimum Purchase Requirements *"
        fieldName="minimum_purchase_requirement"
        formConfig={formConfig}
        //   need to update these options , need to confirm from backend
        options={PURCHASE_REQUIREMENT_OPTIONS}
        rules={createRequiredValidation("Minimum purchase requirement")}
      />
      {watch("minimum_purchase_requirement") === "minimum_purchase" &&
        renderCommonTextField(
          "Minimum Purchase Value",
          "minimum_purchase_value"
        )}
      {watch("minimum_purchase_requirement") === "minimum_items" &&
        renderCommonTextField(
          "Minimum Quantity Of Items",
          "minimum_quantity_value"
        )}
      {shouldShowText(watch("minimum_purchase_requirement")) && (
        <div>
          {location?.state?.type === "amount_off_order" || location?.state?.type === "free_shipping"
            ? "Applies To All Product"
            : "Applies Only To Selected Collections."}
        </div>
      )}
    </div>
  );
};

export default MinimumPurchaseRequirement;
