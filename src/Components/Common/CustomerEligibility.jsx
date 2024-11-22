import React, { useEffect } from "react";
import {
  CUSTOMER_ELIGIBILITY_OPTIONS,
  CUSTOMER_SPECIFIC_OPTIONS,
} from "../../constant";
import { createRequiredValidation } from "../../utils/helpers";
import RadioGroup from "../../Form Fields/RadioGroup";
import CommonSelect from "../../Form Fields/CommonSelect";

const CustomerEligibility = ({ formConfig }) => {
  const { watch, setValue } = formConfig;
  const { customer_eligibility } = watch();
  useEffect(() => {
    if (customer_eligibility === "all_customer")
      setValue("customer_specification", "");
  }, [customer_eligibility]);
  return (
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
  );
};

export default CustomerEligibility;
