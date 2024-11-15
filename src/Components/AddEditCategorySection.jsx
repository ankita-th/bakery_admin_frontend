import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import { closeIcon, draftIcon, publishIcon } from "../assets/Icons/Svg";
import AddEditSectionHeading from "./AddEditSectionHeading";
import CommonTextField from "../Form Fields/CommonTextField";
import { CategoryValidations } from "../Validations/validations";
import CommonSelectField from "../Form Fields/CommonSelectField";
import CommonSelect from "../Form Fields/CommonSelect";
import ImageUploadSection from "../Form Fields/ImageUploadSection";
import { allowedImageTypes } from "../constant";
import { prefillFormValues } from "../utils/helpers";
import CommonButton from "./Common/CommonButton";
const PARENT_CATEGORY_OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const keysToPrefill = [
  "name",
  "description",
  "parent_count",
  "slug",
  "parent_category",
];

const AddEditCategorySection = ({
  onClose,
  formConfig,
  onSubmit,
  editCategoryInfo,
  file,
  setFile,
  btnLoaders,
  fromRecipe = false,
}) => {
  const { watch, setValue, handleSubmit } = formConfig;
  const { isEdit, item } = editCategoryInfo;

  useEffect(() => {
    if (isEdit) {
      // function for prefilling normal values
      prefillFormValues(item, keysToPrefill, setValue);
      // for handling custom prefilling logic
      // setValue("image", imagePreview);
    }
  }, []);
  return (
    // update required: Update this from modal to section according to the figma
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section">
        <AddEditSectionHeading
          onClose={onClose}
          text={isEdit ? "Edit Category" : "Add New Category"}
        />
        {/* here custom logic is required that's why not using form wrapper */}

        <FormWrapper
          onSubmit={onSubmit}
          formConfig={formConfig}
          className="orange_btn"
          isCustomButtons={true}
        >
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}{" "}
          <CommonTextField
            label="Title *"
            fieldName="name"
            formConfig={formConfig}
            className="add-edit-input"
            rules={CategoryValidations["name"]}
            placeholder="Enter Title"
          />
          <CommonTextField
            label="Slug *"
            fieldName="slug"
            formConfig={formConfig}
            rules={CategoryValidations["slug"]}
            className="add-edit-input"
            placeholder="Enter Slug"
          />
          {/* update this field according to the API */}
          {!fromRecipe && (
            <CommonSelect
              selectType="normal"
              options={PARENT_CATEGORY_OPTIONS}
              rules={CategoryValidations["parent"]}
              fieldName="parent"
              defaultOption="None"
              formConfig={formConfig}
              className="add-edit-input"
              label="Parent Category"
            />
          )}
          <CommonTextField
            label="Description"
            fieldName="description"
            formConfig={formConfig}
            className="add-edit-input"
            rules={CategoryValidations["description"]}
            placeholder="Enter Description"
            rows={4}
            type="textarea"
          />
          <ImageUploadSection
            label="Upload/Add Image"
            formConfig={formConfig}
            fieldName="category_image"
            file={file}
            setFile={setFile}
            allowedTypes={allowedImageTypes}
          />
          {!fromRecipe ? (
            <div className="button-section">
              <CommonButton
                type="submit"
                text="Publish"
                className="orange_btn"
                icon={publishIcon}
                name="publish"
                loader={btnLoaders?.publish}
                disabled={btnLoaders?.publish || btnLoaders?.publish}
              />

              <CommonButton
                type="submit"
                text="Draft"
                className="orange_btn"
                icon={draftIcon}
                name="draft"
                loader={btnLoaders?.draft}
                disabled={btnLoaders?.publish || btnLoaders?.publish}
              />
            </div>
          ) : (
            <CommonButton
              text="Add category"
              className="orange_btn"
              icon={publishIcon}
              name="publish"
              loader={btnLoaders?.publish}
              disabled={btnLoaders?.publish}
            />
          )}
          {/* </form> */}
        </FormWrapper>
      </div>
    </div>
  );
};

export default AddEditCategorySection;
