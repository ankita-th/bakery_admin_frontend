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
import { T } from "../utils/languageTranslator";
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
          text={` ${isEdit ? T["update"]:T["add"] } ${T["employee"]}`}
        />
        <FormWrapper
          onSubmit={onSubmit}
          formConfig={formConfig}
          className="orange_btn"
          isCustomButtons={true}
        >
          {/* update required:need to update field name and after that name inside validations as well */}

          <CommonTextField
            label={`${T["employee_id"]} *`}
            fieldName="employee_id"
            placeholder={T["enter_employee_id"]}
            rules={EmployeeValidations["employee_id"]}
            formConfig={formConfig}
          />

          <CommonTextField
            label={`${T["first_name"]} *`}
            fieldName="first_name"
            placeholder={T["first_name_of_employee"]}
            rules={EmployeeValidations["first_name"]}
            formConfig={formConfig}
          />
          <CommonTextField
            label={`${T["last_name"]} *`}
            fieldName="last_name"
            placeholder={T["last_name_of_employee"]}
            rules={EmployeeValidations["last_name"]}
            formConfig={formConfig}
          />

          <CommonSelect
            formConfig={formConfig}
            label={`${T["role"]} *`}
            selectType="normal"
            options={ROLE_OPTIONS}
            defaultOption="Select Role"
            fieldName="role"
            className="add-edit-input"
            rules={EmployeeValidations["role"]}
          />

          <CommonTextField
            label={`${T["email"]} *`}
            placeholder={T["enter_email"]}
            rules={EmployeeValidations["email"]}
            fieldName="email"
            formConfig={formConfig}
          />

          <CommonTextField
            label={`${T["phone_number"]} *`}
            fieldName="contact_no"
            placeholder={T["eg"]}
            rules={EmployeeValidations["contact_no"]}
            formConfig={formConfig}
            isNumberOnly={true}
            isDecimal={false}
          />

          <CommonSelect
            formConfig={formConfig}
            label={`${T["shift"]} *`}
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
            label={`${T["hiring_date"]} *`}
          />

          <LocationField
            fieldName="address"
            formConfig={formConfig}
            placeholder={T["enter_employee_address"]}
            label={`${T["address"]} *`}
            rules={EmployeeValidations["address"]}
            options={{
              types: ["address"],
              componentRestrictions: { country: ["se"] },
            }}
          />
          <LocationField
            fieldName="city"
            formConfig={formConfig}
            placeholder={T["enter_city"]}
            label={`${T["city"]} *`}
            rules={EmployeeValidations["city"]}
            options={{
              types: ["(cities)"],
              componentRestrictions: { country: ["se"] },
            }}
          />

          <CommonSelect
            formConfig={formConfig}
            label={`${T["state"]} *`}
            selectType="normal"
            options={SWEDEN_COUNTY_OPTIONS}
            defaultOption="State"
            fieldName="state"
            className="add-edit-input"
            rules={EmployeeValidations["state"]}
          />

          <CommonTextField
            label={`${T["zip_code"]} *`}
            placeholder={T["zip_code"]}
            rules={EmployeeValidations["zip_code"]}
            fieldName="zip_code"
            formConfig={formConfig}
            maxlength={5}
          />

          <div className="button-section">
            <CommonButton
              type="submit"
              text={`${isEdit ? T["update"]:T["add"]} ${T["employee"]}`}
              className="orange_btn"
              name="addEmployee"
              loader={loader}
              disabled={loader}
            />
            {/* need to confirm functionality for this */}
            <CommonButton
              type="button"
              text={T["cancel"]}
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
