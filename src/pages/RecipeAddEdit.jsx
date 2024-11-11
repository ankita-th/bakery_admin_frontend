import React, { Fragment, useEffect, useState } from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import { useFieldArray, useForm } from "react-hook-form";
import { RecipeValidations } from "../Validations/validations";
import FormWrapper from "../Wrappers/FormWrapper";
import {
  crossIcon,
  draftIcon,
  plusIcon,
  publishIcon,
} from "../assets/Icons/Svg";
import CommonButton from "../Components/Common/CommonButton";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonFieldArray from "../Components/Common/CommonFieldArray";
import CommonSelectField from "../Form Fields/CommonSelectField";
import { DEFAULT_ERROR_MESSAGE, OPTIONS } from "../constant";
import CommonTextEditor from "../Form Fields/CommonTextEditor";
import {
  appendStepCountInObject,
  extractOption,
  prefillFormValues,
} from "../utils/helpers";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { RECIPE_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import { useNavigate, useParams } from "react-router-dom";
const ALLERGEN_OPTIONS = [{ value: "CN", label: "Contain Nuts" }];
const DIETRY_OPTIONS = [{ value: "GF", label: "Gluten-free" }];
const DIFFICULTY_OPTIONS = [
  { label: "Easy", value: "E" },
  { label: "Medium", value: "M" },
  { label: "Hard", value: "H" },
];
const INGREDIENT_TO_APPEND = { name: "", quantity: "", unit_of_measure: "" };
const INSTRUCTION_TO_APPEND = { step_count: null, instructions: "", notes: "" };
const INGREDIENTS_ITEMS = [
  {
    fieldName: "name",
    placeholder: "Enter name",
    label: "Ingredient Name",
    isRequired: true,
  },
  {
    fieldName: "quantity",
    placeholder: "Enter Quantity",
    label: "Ingredient Quantity",
    isRequired: true,
  },
  {
    fieldName: "unit_of_measure",
    placeholder: "Quantity Unit",
    label: "Unit of Measure",
    isRequired: true,
  },
];
const INSTRUCTION_ITEMS = [
  {
    fieldName: "step_count",
    placeholder: "Enter name",
    label: "Step Count",
    isNumberOnly: true,
    isStepCount: true,
    field_type: "stepCount",
  },
  {
    fieldName: "instructions",
    placeholder: "Enter Instructions",
    label: "Instructions",
    isRequired: true,
  },
  {
    fieldName: "notes",
    placeholder: "Enter Notes",
    label: "Notes",
    isRequired: false,
  },
];

const RecipeAddEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const formConfig = useForm({
    defaultValues: {
      ingredients: [{ name: "", quantity: "", unit_of_measure: "" }],
      instructions: [{ step_count: "", instructions: "", notes: "" }],
    },
  });
  const {
    control,
    setValue,
    formState: { errors },
  } = formConfig;
  const { append, fields, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const { watch } = formConfig;

  useEffect(() => {
    makeApiRequest({
      endPoint: `${RECIPE_ENDPOINT}${1}/`,
      method: METHODS.get,
      // params: { id: params?.receipe_id },
    })
      .then((res) => {
        const response = res?.data;
        const prefillKeys = [
          "recipe_title",
          "recipe_title",
          "preparation_time",
          "notes",
          "cook_time",
          "serving_size",
          "ingredients",
          "description",
          "instructions",
        ];
        //  for prefilling normal values
        prefillFormValues(response, prefillKeys, setValue);
        const difficultyOption = extractOption(
          DIFFICULTY_OPTIONS,
          response?.difficulty_level,
          "value"
        );
        const allergenOption = extractOption(
          ALLERGEN_OPTIONS,
          response?.allergen_information,
          "value"
        );
        const dietryOption = extractOption(
          DIETRY_OPTIONS,
          response?.dietary_plan,
          "value"
        );
        console.log(allergenOption, "allergenOption");

        setValue("difficulty_level", difficultyOption);
        setValue("allergen_information", allergenOption);
        setValue("dietary_plan", dietryOption);

        // for prefilling values that requires custom logic
      })
      .catch((err) => {
        console.log(err); // update required: Check in which field error message
      });
  }, []);

  const onSubmit = (values, event) => {
    console.log(values, "these are values");
    const buttonType = event.nativeEvent.submitter.name;

    const payload = {
      ...values,
      preparation_time: +values?.preparation_time,
      serving_size: +values?.serving_size,
      cook_time: +values?.cook_time,
      instructions: appendStepCountInObject(values?.instructions),
      difficulty_level: values?.difficulty_level?.value,
      dietary_plan: values?.dietary_plan?.value,
      allergen_information: values?.allergen_information?.value,
      status: buttonType === "draft",
      // update required: Make this category_image and category  dynamic
      category: +5,
      category_images: [{ image: "" }],
    };
    // if receipe id is there in the params means it is a edit scenario
    makeApiRequest({
      endPoint: RECIPE_ENDPOINT,
      payload: payload,
      method: params?.receipe_id ? METHODS?.patch : METHODS?.post,
      update_id: params?.receipe_id && params?.receipe_id,
    })
      .then(() => {
        toastMessage(
          `Recipe ${params?.receipe_id ? "updated" : "added"} successfully`,
          successType
        );
        navigate("/recipe");
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      });
    // update required:Need to add loaders
  };

  return (
    <div>
      <div className="bg-[#FFFFFF]-100 p-6 rounded-lg shadow-md max-w-100">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <FormWrapper
              formConfig={formConfig}
              onSubmit={onSubmit}
              isCustomButtons={true}
            >
              {/* update required: need to confirm about category field */}
              <CommonTextField
                formConfig={formConfig}
                label="Recipe Title"
                fieldName="recipe_title"
                placeholder="Enter Recipe Title"
                className="recipe-input"
                rules={RecipeValidations["recipe_title"]}
              />
              <div className="description mt-2">
                <CommonTextEditor
                  label="Description"
                  fieldName="description"
                  formConfig={formConfig}
                  placeholder="Type..."
                  requiredMessage="This field is required" //validations works a bit different in text editor that's why
                />
              </div>

              <div className="recipe-section-two">
                <div className="sec-1">
                  <CommonTextField
                    formConfig={formConfig}
                    label="Preparation Time"
                    fieldName="preparation_time"
                    placeholder="Enter the prep time in minutes or hours"
                    className="recipe-input"
                    rules={RecipeValidations["preparation_time"]}
                    isNumberOnly={true}
                  />

                  <CommonTextField
                    formConfig={formConfig}
                    label="Cook Time"
                    fieldName="cook_time"
                    placeholder="Enter the cook time"
                    className="recipe-input"
                    rules={RecipeValidations["cook_time"]}
                    isNumberOnly={true}
                  />
                </div>

                <div className="sec-2">
                  <CommonTextField
                    formConfig={formConfig}
                    label="Serving Size"
                    fieldName="serving_size"
                    placeholder="Number of servings the recipe make."
                    className="recipe-input"
                    rules={RecipeValidations["serving_size"]}
                    isNumberOnly={true}
                  />
                  <CommonSelect
                    formConfig={formConfig}
                    label="Difficulty Level"
                    fieldName="difficulty_level"
                    placeholder="Select difficulty level"
                    className="recipe-input"
                    selectType="react-select"
                    options={DIFFICULTY_OPTIONS}
                    rules={RecipeValidations["difficulty_level"]}
                  />
                </div>

                <div className="ingredients-section">
                  <CommonFieldArray
                    heading="Ingredients"
                    fieldArrayName="ingredients"
                    formConfig={formConfig}
                    itemToAppend={INGREDIENT_TO_APPEND}
                    items={INGREDIENTS_ITEMS}
                  />
                </div>
                <div className="instructions-section">
                  <CommonFieldArray
                    heading="Instructions/Steps"
                    fieldArrayName="instructions"
                    formConfig={formConfig}
                    itemToAppend={INSTRUCTION_TO_APPEND}
                    items={INSTRUCTION_ITEMS}
                  />
                </div>

                <div className="dietry-section flex items-center space-x-4">
                  {/* may be need to update this field into text field further */}
                  <CommonSelect
                    label="Dietary Information"
                    selectType="react-select"
                    options={DIETRY_OPTIONS}
                    fieldName="dietary_plan"
                    formConfig={formConfig}
                    placeholder="Select"
                    rules={RecipeValidations["dietary_plan"]}
                  />

                  <CommonSelect
                    label="Allergen Informations"
                    selectType="react-select"
                    options={ALLERGEN_OPTIONS}
                    fieldName="allergen_information"
                    formConfig={formConfig}
                    placeholder="Select"
                    rules={RecipeValidations["allergen_informations"]}
                  />
                </div>
                <div className="notes">
                  <CommonTextField
                    formConfig={formConfig}
                    label="Notes/Additional Information"
                    fieldName="notes"
                    placeholder="Any additional notes or tips"
                    className="recipe-input"
                    rules={RecipeValidations["notes"]}
                    type="textarea"
                    rows={4}
                  />
                </div>
              </div>
              <div className="button-section">
                <CommonButton
                  type="submit"
                  text="Publish"
                  icon={publishIcon}
                  className="buttonTwo"
                  name="publish"
                />
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
      </div>
    </div>
  );
};

export default RecipeAddEdit;
