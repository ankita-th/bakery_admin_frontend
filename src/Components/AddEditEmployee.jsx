import React, { useEffect } from "react";
import FormWrapper from "../Wrappers/FormWrapper";
import AddEditSectionHeading from "./AddEditSectionHeading";
import CommonTextField from "../Form Fields/CommonTextField";
import { EmployeeValidations } from "../Validations/validations";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonButton from "./Common/CommonButton";
import CommonDateField from "../Form Fields/CommonDateField";
import {
  DUMMY_EMPLOYEE,
  ROLE_OPTIONS,
  SHIFT_OPTIONS,
  SWEDEN_COUNTY_OPTIONS,
} from "../constant";
import { prefillFormValues } from "../utils/helpers";
import LocationField from "../Form Fields/LocationField";
const AddEditEmployee = ({
  onClose,
  onSubmit,
  formConfig,
  editInfo,
  loader,
}) => {
  const { isEdit, editItem } = editInfo;
  const { setValue, watch } = formConfig;
  useEffect(() => {
    if (isEdit) {
      // for first and last name and role and email
      const prefillKeys = ["first_name", "last_name", "email", "role"];
      prefillFormValues(editItem, prefillKeys, setValue);

      // for employee id, phone number, shift, hiring date, address, city state and zip code
      const prefillKeys2 = [
        "employee_id",
        "contact_no",
        "shift",
        "state",
        "zip_code",
        "hiring_date",
        "city",
        "address",
      ];
      prefillFormValues(
        editItem?.employee_detail,
        prefillKeys2,
        setValue
      );
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section overflow-auto">
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
            label="Employee ID *"
            fieldName="employee_id"
            placeholder="Enter Employee ID"
            rules={EmployeeValidations["employee_id"]}
            formConfig={formConfig}
          />

          <CommonTextField
            label="First Name *"
            fieldName="first_name"
            placeholder="First Name of Employee"
            rules={EmployeeValidations["first_name"]}
            formConfig={formConfig}
          />
          <CommonTextField
            label="Last Name *"
            fieldName="last_name"
            placeholder="Last Name of Employee"
            rules={EmployeeValidations["last_name"]}
            formConfig={formConfig}
          />

          <CommonSelect
            formConfig={formConfig}
            label="Role *"
            selectType="normal"
            options={ROLE_OPTIONS}
            defaultOption="Select Role"
            fieldName="role"
            className="add-edit-input"
            rules={EmployeeValidations["role"]}
          />

          <CommonTextField
            label="Email *"
            placeholder="Enter Email"
            rules={EmployeeValidations["email"]}
            fieldName="email"
            formConfig={formConfig}
          />

          <CommonTextField
            label="Phone Number *"
            fieldName="contact_no"
            placeholder="Eg. 46 123 456 789 or 012 345 6789"
            rules={EmployeeValidations["contact_no"]}
            formConfig={formConfig}
            isNumberOnly={true}
            isDecimal={false}
          />

          <CommonSelect
            formConfig={formConfig}
            label="Shift *"
            selectType="normal"
            options={SHIFT_OPTIONS}
            defaultOption="Select Shift"
            fieldName="shift"
            className="add-edit-input"
            rules={EmployeeValidations["shift"]}
          />

          <CommonDateField
            formConfig={formConfig}
            fieldName="hiring_date"
            // minDate={today}
            rules={EmployeeValidations["hiring_date"]}
            label="Hiring Date *"
          />

          <LocationField
            fieldName="address"
            formConfig={formConfig}
            placeholder="Enter Employee Address"
            label="Address *"
            rules={EmployeeValidations["address"]}
            options={{
              types: ["address"],
              componentRestrictions: { country: ["se"] },
            }}
          />
          <LocationField
            fieldName="city"
            formConfig={formConfig}
            placeholder="Enter City"
            label="City *"
            rules={EmployeeValidations["city"]}
            options={{
              types: ["(cities)"],
              componentRestrictions: { country: ["se"] },
            }}
          />

          <CommonSelect
            formConfig={formConfig}
            label="State *"
            selectType="normal"
            options={SWEDEN_COUNTY_OPTIONS}
            defaultOption="State"
            fieldName="state"
            className="add-edit-input"
            rules={EmployeeValidations["state"]}
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
              name="addEmployee"
              loader={loader}
              disabled={loader}
            />
            {/* need to confirm functionality for this */}
            <CommonButton
              type="button"
              text="Cancel"
              className="orange_btn"
              onClick={onClose}
            />
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddEditEmployee;
