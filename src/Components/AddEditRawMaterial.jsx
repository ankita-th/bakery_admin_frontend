import React, { useEffect } from "react";
import FormWrapper from "../Wrappers/FormWrapper";
import AddEditSectionHeading from "./AddEditSectionHeading";
import CommonTextField from "../Form Fields/CommonTextField";
import { RawMaterialValidations } from "../Validations/validations";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonButton from "./Common/CommonButton";
import { draftIcon, publishIcon } from "../assets/Icons/Svg";
import CommonDateField from "../Form Fields/CommonDateField";
import { today, YYYY_MM_DD } from "../constant";
import { formatDate, prefillFormValues } from "../utils/helpers";
const MEASURE_OPTIONS = [
  { label: "Kilogram", value: "kg" },
  { label: "Gram", value: "g" },
  { label: "Litre", value: "kg" },
];
const AddEditRawMaterial = ({ onClose, onSubmit, formConfig, editInfo }) => {
  const { isEdit, item } = editInfo;
  const { setValue, watch} = formConfig;
  console.log(editInfo, "editInfo inside comp");
  useEffect(() => {
    const prefillKeys = [
      "description",
      "name",
      "unit_of_measure",
      "reorder",
      "quantity",
      "expiry_date",
      "cost"
    ];
    if (isEdit) {
      // for filling normal keys
      prefillFormValues(item, prefillKeys, setValue);
      // for prefilling values with custom logic
      setValue("expiry_date",formatDate(item?.expiry_date,YYYY_MM_DD));
    }
  }, []);

  const fillForm = () => {
    setValue("name", "flour");
    setValue("quantity", 150);
    setValue("reorder", 50);
    setValue("expiry_date", "2024-12-5");
    setValue("notes", "High-quality wheat");
    setValue("cost", "150");
  };
  console.log(watch("expiry_date"),"expiry date");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section">
        <AddEditSectionHeading
          onClose={onClose}
          text={isEdit ? "Edit Raw material" : "Add Raw material"}
        />
        <CommonButton text="fill form" type="button" onClick={fillForm} />
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
            label="Quantity In Stock *"
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
            defaultOption="Select Unit Of Product"
            fieldName="unit_of_measure"
            className="add-edit-input"
            rules={RawMaterialValidations["unit_of_measure"]}
          />
          <CommonTextField
            label="Reorder Level"
            fieldName="reorder"
            placeholder="Enter Reorder Level"
            rules={RawMaterialValidations["reorder"]}
            formConfig={formConfig}
            isNumberOnly={true}
          />

          <CommonTextField
            label="Cost Per Unit (USD)*"
            fieldName="cost"
            placeholder="Cost Per Unit"
            rules={RawMaterialValidations["cost"]}
            formConfig={formConfig}
          />

          <CommonTextField
            label="Notes"
            fieldName="description"
            rules={RawMaterialValidations["description"]}
            formConfig={formConfig}
            placeholder="Enter Notes"
            type="textarea"
            rows={4}
          />
          <CommonDateField
            formConfig={formConfig}
            fieldName="expiry_date"
            minDate={today}
            rules={RawMaterialValidations["expiry_date"]}
            label="Expiry Date *"
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
              name="publish"
            />
            {/* need to confirm functionality for this */}
            <CommonButton
              type="submit"
              text="Draft"
              icon={draftIcon}
              className="buttonTwo"
              name="draft"
            />
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddEditRawMaterial;
