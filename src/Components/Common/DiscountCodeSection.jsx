import React from "react";
import GenrateRandomCode from "./GenrateRandomCode";
import CommonTextField from "../../Form Fields/CommonTextField";
import { createRequiredValidation } from "../../utils/helpers";

const DiscountCodeSection = ({ formConfig }) => {
  const { setValue } = formConfig;
  return (
    <div>
      <GenrateRandomCode fieldName="code" setValue={setValue} />
      <CommonTextField
        label="Discount Code *"
        fieldName="code"
        rules={createRequiredValidation("Discount code")}
        formConfig={formConfig}
        className="px-4 py-2 w-full rounded-lg"
        placeholder="Enter Code"
      />
      <div className="div">Customers must enter this code at checkout.</div>
    </div>
  );
};

export default DiscountCodeSection;
