import React, { useEffect } from "react";
import FormWrapper from "../../Wrappers/FormWrapper";
import AddEditSectionHeading from "../AddEditSectionHeading";
import CommonTextField from "../../Form Fields/CommonTextField";
import { createRequiredValidation } from "../../utils/helpers";
const AddEditInventory = ({
  onClose,
  onSubmit,
  formConfig,
  editInfo,
  btnLoaders,
}) => {
  const { isEdit, item } = editInfo;
  const { setValue, watch } = formConfig;
  //   useEffect(() => {
  //     const prefillKeys = [
  //       "description",
  //       "name",
  //       "unit_of_measure",
  //       "reorder",
  //       "quantity",
  //       "expiry_date",
  //       "cost",
  //     ];
  //     if (isEdit) {
  //       // for filling normal keys
  //       prefillFormValues(item, prefillKeys, setValue);
  //       // for prefilling values with custom logic
  //       setValue("expiry_date", formatDate(item?.expiry_date, YYYY_MM_DD));
  //     }
  //   }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section">
        <AddEditSectionHeading
          onClose={onClose}
          text={isEdit ? "Edit Raw Material" : "Add Raw Material"}
        />
        {/* <CommonButton text="fill form" type="button" onClick={fillForm} /> */}
        <FormWrapper
          onSubmit={onSubmit}
          formConfig={formConfig}
          className="orange_btn"
          isCustomButtons={true}
        >
          {/* update required : need to update fields name */}
          <CommonTextField
            label="Stock Name *"
            fieldName="name"
            formConfig={formConfig}
            rules={createRequiredValidation("Stock Name")}
            placeholder="Enter Stock Name"
          />
          {/* <CommonTextField label="Select SKU" /> */}
          <CommonTextField
            label="Barcode From *"
            fieldName="barcode_from"
            rules={createRequiredValidation("Barcode From")}
            placeholder="Enter barcode from"
            formConfig={formConfig}
          />
          <CommonTextField
            label="Barcode To *"
            fieldName="barcode_from"
            rules={createRequiredValidation("Barcode From")}
            placeholder="Enter barcode from"
            formConfig={formConfig}
          />
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddEditInventory;
