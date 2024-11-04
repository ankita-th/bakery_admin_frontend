import React from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import CommonTextEditor from "../Form Fields/CommonTextEditor";
import RadioGroup from "../Form Fields/RadioGroup";
import CommonSelect from "../Form Fields/CommonSelect";
import ImageUploadSection from "../Form Fields/ImageUploadSection";
const options = [
  { label: "option1", value: "options1" },
  { label: "option2", value: "options2" },
  { label: "option3", value: "options3" },
  { label: "option4", value: "options4" },
];

const PREVIEW_AS_OPTIONS = [
  { value: "desktop", label: "Desktop Result" },
  { value: "mobile", label: "Mobile Result" },
];
const AddEditProduct = () => {
  const formConfig = useForm();
  const { watch } = formConfig;
  const onSubmit = (values) => {
    console.log(values, "these are values");
  };
  console.log(watch("product_tags_2"), "description");
  return (
    <div>
      <FormWrapper formConfig={formConfig} onSubmit={onSubmit}>
        <CommonSelect
          options={options}
          formConfig={formConfig}
          fieldName="product_tags_2"
          rules={{ required: "This field is required" }}
          placeholder="Select tags"
          selectType="react-select"
        />

        <CommonTextEditor
          formConfig={formConfig}
          fieldName="description"
          placeholder="Type..."
          // rules={} // for this required validation cannot be passed through rules because it has some different way to handle required validation
          requiredMessage={"Description is required"} // if this prop is not passed required validation is not applied
        />
        <RadioGroup
          fieldName="preview_as"
          formConfig={formConfig}
          options={PREVIEW_AS_OPTIONS}
          rules={{ required: "This field is required" }}
        />
      </FormWrapper>
    </div>
  );
};

export default AddEditProduct;
