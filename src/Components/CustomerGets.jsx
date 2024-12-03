import React from "react";

const CustomerGets = ({ formConfig }) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg">
        <RadioGroup
          className="flex gap-4"
          label="Customer Eligibility"
          fieldName="customer_eligibility"
          formConfig={formConfig}
          //   need to update these options , need to confirm from backend
          options={CUSTOMER_ELIGIBILITY_OPTIONS}
          rules={createRequiredValidation("Customer eligibility")}
        />
        {watch("customer_eligibility") === "specific_customer" && (
          <>
            <CommonSelect
              formConfig={formConfig}
              label="Customer Specification"
              fieldName="customer_specification"
              options={CUSTOMER_SPECIFIC_OPTIONS}
              rules={createRequiredValidation("Customer specification")}
              placeholder="Select Customer Specification"
              className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
            />
            <div>Applies only to selected collections.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerGets;
