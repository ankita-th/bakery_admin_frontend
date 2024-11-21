import React, { useEffect, useState } from "react";
import FormWrapper from "../Wrappers/FormWrapper";
import { draftIcon, publishIcon } from "../assets/Icons/Svg";
import AddEditSectionHeading from "./AddEditSectionHeading";
import CommonTextField from "../Form Fields/CommonTextField";
import { CategoryValidations } from "../Validations/validations";
import CommonSelect from "../Form Fields/CommonSelect";
import ImageUploadSection from "../Form Fields/ImageUploadSection";
import { allowedImageTypes } from "../constant";
import {
  convertIntoSelectOptions,
  createPreview,
  extractOption,
  prefillFormValues,
} from "../utils/helpers";
import CommonButton from "./Common/CommonButton";
const PARENT_CATEGORY_OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const keysToPrefill = ["name", "description", "parent_count", "slug"];

const AddEditCategorySection = ({
  onClose,
  formConfig,
  onSubmit,
  editCategoryInfo,
  file,
  setFile,
  btnLoaders,
  fromRecipe = false,
  categories = null,
}) => {
  const { setValue, watch } = formConfig;
  const { isEdit, item, type } = editCategoryInfo;
  const [categoryOptions, setCategoryOptions] = useState([]);
  console.log(item, "this is category item");
  useEffect(() => {
    if (isEdit) {
      // function for prefilling normal values
      prefillFormValues(item, keysToPrefill, setValue);
      // for handling custom prefilling logic
      // setValue("image", imagePreview);
      if (item?.category_image) {
        setFile({ preview: createPreview(item?.category_image), file: null });
      }
      const category = extractOption(categories, item?.parent?.id, "id");
      console.log(category, "this is category extracted");
      if (category) {
        setValue("parent", { label: category?.name, value: category?.id });
      }
    }
  }, []);
  console.log(watch("parent"), "log this is parent");
  console.log(categoryOptions, "log categoryoptions");

  useEffect(() => {
    const categoryOptions = [];
    if (categories && categories?.length) {
      const temp = convertIntoSelectOptions(categories, "name", "id");
      setCategoryOptions(temp);
    }
  }, [categories]);

  const shouldShowParentCategoryField = () => {
    return !fromRecipe && categories?.length;
  };
  const renderHeading = () => {
    if (isEdit) {
      return `Edit ${type === "category" ? "Category" : "Subcategory"}`;
    } else {
      return "Add Category";
    }
  };
  return (
    // update required: Update this from modal to section according to the figma
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="category-section">
        <AddEditSectionHeading onClose={onClose} text={renderHeading()} />
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
            placeholder="Enter Slug e.g (BRE-8700)"
          />
          {/* update this field according to the API */}
          {shouldShowParentCategoryField() && (
            <CommonSelect
              selectType="react-select"
              options={categoryOptions}
              rules={CategoryValidations["parent"]}
              fieldName="parent"
              defaultOption="None"
              formConfig={formConfig}
              className="add-edit-input"
              label="Parent Category"
              placeholder="None"
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
            uniqueId={"cat-img"}
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
