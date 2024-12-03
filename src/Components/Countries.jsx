import React, { useEffect } from "react";
import { COUNTRY_OPTIONS, CUSTOMER_SPECIFIC_OPTIONS } from "../constant";
import { createRequiredValidation } from "../utils/helpers";
import RadioGroup from "../Form Fields/RadioGroup";
import CommonSelect from "../Form Fields/CommonSelect";
import Checkbox from "../Form Fields/Checkbox";
import CommonTextField from "../Form Fields/CommonTextField";
import LocationField from "../Form Fields/LocationField";
import { EmployeeValidations } from "../Validations/validations";

const Countries = ({ formConfig }) => {
  const { watch, setValue,clearErrors } = formConfig;
  //   useEffect(() => {
  //     if (customer_eligibility === "all_customer")
  //       setValue("customer_specification", "");
  //   }, [customer_eligibility]);


  useEffect(() => {
    if (watch("countries") === "all_countries") {
      setValue("selected_countries", "");
      clearErrors("country_select");
    }
  }, [watch("countries")]);

  useEffect(() => {
    if (watch("exclude_shipping_rate") === true) {
      setValue("shipping_rate", "");
      clearErrors("shipping_rate");
    }
  }, [watch("exclude_shipping_rate")]);


  return (
    <div className="bg-white p-6 rounded-lg space-y-4">
      <RadioGroup
        className="flex gap-4"
        label="Countries"
        fieldName="countries"
        formConfig={formConfig}
        //   need to update these options , need to confirm from backend
        options={COUNTRY_OPTIONS}
        rules={createRequiredValidation("Countries")}
      />
      {watch("countries") === "selected_countries" && (
        <>
          {/* <CommonSelect
            formConfig={formConfig}
            // label="Customer Specification"
            fieldName="country_select"
            options={CUSTOMER_SPECIFIC_OPTIONS}
            rules={createRequiredValidation("Countries")}
            placeholder="Select Countries"
            className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
          /> */}
          <LocationField
            fieldName="country_select"
            formConfig={formConfig}
            placeholder="Select Countries"
            // label="Address *"
            // rules={EmployeeValidations["address"]}
            rules={createRequiredValidation("Countries")}
            options={{
              types: ["country"],
            //   componentRestrictions: { country: ["se"] },
            }}
          />
        </>
      )}
      <div className="space-y-2">
        <div className="text-black">Shipping Rates</div>
        <Checkbox
          formConfig={formConfig}
          fieldName={"exclude_shipping_rate"}
          label={"Exclude shipping rates over a certain amount"}
        />
        {watch("exclude_shipping_rate") === true && (
          <CommonTextField
            formConfig={formConfig}
            fieldName="shipping_rate"
            placeholder="0.00"
            isNumberOnly={true}
            rules={createRequiredValidation("Shipping Rates")}
          />
        )}
      </div>
    </div>
  );
};

export default Countries;
