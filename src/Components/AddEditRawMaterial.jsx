import React, { useEffect } from "react";
import FormWrapper from "../Wrappers/FormWrapper";
import AddEditSectionHeading from "./AddEditSectionHeading";
import CommonTextField from "../Form Fields/CommonTextField";
import { RawMaterialValidations } from "../Validations/validations";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonButton from "./Common/CommonButton";
import { draftIcon, publishIcon } from "../assets/Icons/Svg";
import CommonDateField from "../Form Fields/CommonDateField";
import { today } from "../constant";
import { prefillFormValues } from "../utils/helpers";
const MEASURE_OPTIONS = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];
const AddEditRawMaterial = ({ onClose, onSubmit, formConfig, editInfo }) => {
  const { isEdit, item } = editInfo;
  const { setValue } = formConfig;
  console.log(editInfo,"editInfo inside comp");
  useEffect(() => {
    const prefillKeys = ["notes","name", "unit_of_measure", "reorder", "quantity","expiration_date"];
    if (isEdit) {
      // for filling normal keys
      prefillFormValues(item, prefillKeys, setValue);
      // for prefilling values with custom logic
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section">
        <AddEditSectionHeading
          onClose={onClose}
          text={isEdit ? "Edit Raw material" : "add Raw material"}
        />
        <FormWrapper
          onSubmit={onSubmit}
          formConfig={formConfig}
          className="buttonTwo"
          isCustomButtons={true}
        >
          <CommonTextField
            label="Material Name *"
            fieldName="name"
            rules={RawMaterialValidations["name"]}
            formConfig={formConfig}
          />

          <CommonTextField
            label="Quantity in stock (in Kg) *"
            fieldName="quantity"
            rules={RawMaterialValidations["quantity"]}
            formConfig={formConfig}
            isNumberOnly={true}
          />
          
          <CommonSelect
            formConfig={formConfig}
            label="Unit Of Measure *"
            selectType="normal"
            options={MEASURE_OPTIONS}
            defaultOption="Select option"
            fieldName="unit_of_measure"
            className="add-edit-input"
          />
          <CommonTextField
            label="Reorder Level"
            fieldName="reorder"
            rules={RawMaterialValidations["reorder"]}
            formConfig={formConfig}
          />

          <CommonTextField
            label="Cost Per Unit *"
            fieldName="cost"
            rules={RawMaterialValidations["cost"]}
            formConfig={formConfig}
          />

          <CommonTextField
            label="Notes"
            fieldName="notes"
            rules={RawMaterialValidations["description"]}
            formConfig={formConfig}
            placeholder="Enter Notes"
            type="textarea"
            rows={4}
          />
          {/* commented for future use */}

          {/* <CommonDateField
            formConfig={formConfig}
            fieldName="expiry_date"
            minDate={today}
            label="Expiration Date"
          /> */}

          <div className="button-section">
            <CommonButton
              type="submit"
              text="Publish"
              icon={publishIcon}
              className="buttonTwo"
            />
            {/* need to confirm functionality for this */}
            <CommonButton
              type="submit"
              text="Draft"
              icon={draftIcon}
              className="buttonTwo"
            />
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddEditRawMaterial;
