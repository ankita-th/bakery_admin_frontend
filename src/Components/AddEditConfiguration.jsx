import React, { useEffect } from "react";
import FormWrapper from "../Wrappers/FormWrapper";
import AddEditSectionHeading from "./AddEditSectionHeading";
import CommonTextField from "../Form Fields/CommonTextField";
import { ConfigurationValidations } from "../Validations/validations";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonButton from "./Common/CommonButton";
import { AVAILABILITY_OPTIONS, SWEDEN_COUNTY_OPTIONS } from "../constant";
import { extractOption, prefillFormValues } from "../utils/helpers";
import LocationField from "../Form Fields/LocationField";

const AddEditConfiguration = ({
  onClose,
  onSubmit,
  formConfig,
  editInfo,
  btnLoaders,
}) => {
  const { isEdit, editItem } = editInfo;
  const { setValue, watch } = formConfig;
  useEffect(() => {
    const prefillKeys = [
      "zip_code",
      "min_order_quantity",
      // "delivery_threshold",
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
    setValue(
      "state",
      extractOption(SWEDEN_COUNTY_OPTIONS, editItem?.state, "value")
    );
    setValue("address", editItem?.address);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section overflow-auto">
        <AddEditSectionHeading
          onClose={onClose}
          text={isEdit ? "Edit Configuration" : "Add Configuration"}
        />
        <FormWrapper
          onSubmit={onSubmit}
          formConfig={formConfig}
          className="orange_btn"
          isCustomButtons={true}
        >
          <CommonTextField
            label="ZIP Code *"
            fieldName="zip_code"
            rules={ConfigurationValidations["zip_code"]}
            formConfig={formConfig}
            isNumberOnly={true}
            placeholder="Enter ZIP code e.g (12345)"
            maxlength={5}
          />
          <LocationField
            fieldName="address"
            formConfig={formConfig}
            placeholder="Enter Area Name"
            label="Area/Location Name *"
            rules={ConfigurationValidations["address"]}
            options={{
              types: ["address"],
              componentRestrictions: { country: ["se"] },
            }}
          />
          <CommonSelect
            formConfig={formConfig}
            label="State *"
            selectType="react-select"
            placeholder="Select State"
            options={SWEDEN_COUNTY_OPTIONS}
            fieldName="state"
            rules={ConfigurationValidations["state"]}
            // className="add-edit-input"
          />
          <LocationField
            fieldName="city"
            formConfig={formConfig}
            placeholder="Enter City"
            label="City *"
            rules={ConfigurationValidations["city"]}
            options={{
              types: ["(cities)"],
              componentRestrictions: { country: ["se"] },
            }}
          />
          <CommonTextField
            label="Min. Order Quantity *"
            fieldName="min_order_quantity"
            rules={ConfigurationValidations["min_order_quantity"]}
            formConfig={formConfig}
            placeholder="Enter Minimum Purchase Order"
            isNumberOnly={true}
            maxlength={5}
          />

          {/* <CommonTextField
            label="Delivery Threshold ($) *"
            fieldName="delivery_threshold"
            rules={ConfigurationValidations["delivery_threshold"]}
            formConfig={formConfig}
            placeholder="Enter Amount For Free Delivery"
            isNumberOnly={true}
          /> */}

          <CommonSelect
            formConfig={formConfig}
            label="Delivery Available *"
            selectType="react-select"
            placeholder="Select Availability"
            options={AVAILABILITY_OPTIONS}
            fieldName="delivery_availability"
            rules={ConfigurationValidations["delivery_availability"]}
            // className="add-edit-input"
          />

          <CommonTextField
            label="Notes"
            fieldName="notes"
            rules={ConfigurationValidations["notes"]}
            formConfig={formConfig}
            placeholder="Enter Notes"
            type="textarea"
            rows={4}
          />

          <div className="button-section">
            <CommonButton
              type="submit"
              text={`${isEdit ? "Update" : "Add"} Configuration`}
              className="orange_btn"
              name="publish"
              loader={btnLoaders?.publish}
              disabled={btnLoaders?.publish || btnLoaders?.draft}
            />
            {/* need to confirm functionality for this */}
            <CommonButton
              type="submit"
              text="Draft"
              className="orange_btn"
              name="draft"
              loader={btnLoaders?.draft}
              disabled={btnLoaders?.publish || btnLoaders?.draft}
            />
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddEditConfiguration;
