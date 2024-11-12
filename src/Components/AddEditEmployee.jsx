import React, { useEffect, useState } from "react";
import FormWrapper from "../Wrappers/FormWrapper";
import AddEditSectionHeading from "./AddEditSectionHeading";
import CommonTextField from "../Form Fields/CommonTextField";
import {
  ConfigurationValidations,
  EmployeeValidations,
  TodoValidations,
} from "../Validations/validations";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonButton from "./Common/CommonButton";
import CommonDateField from "../Form Fields/CommonDateField";
import { PRIORITY_OPTIONS, STATE_OPTIONS, today } from "../constant";
import {
  employeeListIntoOptions,
  extractOption,
  prefillFormValues,
} from "../utils/helpers";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { EMPLOYEE_ENDPOINT, TODO_ENDPOINT } from "../api/endpoints";
import LocationField from "../Form Fields/LocationField";
const AVAILABILITY_OPTIONS = [
  { label: "Available", value: "available" },
  { label: "Not Available", value: "unavailable" },
];
const AddEditEmployee = ({ onClose, onSubmit, formConfig, editInfo }) => {
  const { isEdit, editItem } = editInfo;
  const { setValue, watch } = formConfig;
  console.log(editItem, "editItem");
  useEffect(() => {
    const prefillKeys = [
      "zip_code",
      "min_order_quantity",
      "delivery_threshold",
      "notes",
      "address",
      "city",
    ];
    // basic fields prefilling
    prefillFormValues(editItem, prefillKeys, setValue);
    // custom values prefilling
    setValue(
      "delivery_availability",
      extractOption(
        AVAILABILITY_OPTIONS,
        editItem?.delivery_availability,
        "value"
      )
    );
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section">
        <AddEditSectionHeading
          onClose={onClose}
          text={` ${isEdit ? "Update" : "Add"} Employee`}
        />
        <FormWrapper
          onSubmit={onSubmit}
          formConfig={formConfig}
          className="orange_btn"
          isCustomButtons={true}
        >
          {/* update required:need to update field name and after that name inside validations as well */}
          <CommonTextField
            label="Name *"
            fieldName="name"
            placeholder="Name of Employee"
            rules={EmployeeValidations["name"]}
            formConfig={formConfig}
          />

          <CommonTextField
            label="Email *"
            placeholder="Enter Email"
            rules={EmployeeValidations["email"]}
            fieldName="email"
            formConfig={formConfig}
          />

          <CommonTextField
            label="ZIP Code *"
            placeholder="ZIP Code"
            rules={EmployeeValidations["zip_code"]}
            fieldName="zip_code"
            formConfig={formConfig}
            maxlength={5}
          />

          <div className="button-section">
            <CommonButton
              type="submit"
              text={`${isEdit ? "Update" : "Add"} Employee`}
              className="orange_btn"
            />
            {/* need to confirm functionality for this */}
            <CommonButton type="button" text="Cancel" className="orange_btn" onClick={onClose} />
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddEditEmployee;
