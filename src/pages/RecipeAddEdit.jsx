import React, { useEffect, useState } from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import { useForm } from "react-hook-form";
import { RecipeValidations } from "../Validations/validations";
import FormWrapper from "../Wrappers/FormWrapper";
import { draftIcon, publishIcon } from "../assets/Icons/Svg";
import CommonButton from "../Components/Common/CommonButton";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonFieldArray from "../Components/Common/CommonFieldArray";
import {
  DEFAULT_ERROR_MESSAGE,
  PNG_AND_JPG,
  RECIPE_MEASURE_OPTIONS,
} from "../constant";
import CommonTextEditor from "../Form Fields/CommonTextEditor";
import {
  appendStepCountInObject,
  createIngredientPayload,
  createPreview,
  createRequiredValidation,
  extractOption,
  handleCategory,
  handleIngredients,
  prefillFormValues,
} from "../utils/helpers";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { RECIPE_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import { useNavigate, useParams } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import PageLoader from "../loaders/PageLoader";
import CategorySection from "../Components/CategorySection";
import ImageUploadSection from "../Form Fields/ImageUploadSection";
import { SPECIAL_CHARACTERS_REGEX } from "../regex/regex";
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
    label: "Ingredient Name *",
    isRequired: true,
  },
  {
    fieldName: "quantity",
    placeholder: "Enter Quantity",
    label: "Ingredient Quantity *",
    isRequired: true,
    isNumberOnly: true,
  },
  {
    fieldName: "unit_of_measure",
    placeholder: "Select Unit",
    label: "Unit of Measure *",
    field_type: "react-select",
    isRequired: true,
    options: RECIPE_MEASURE_OPTIONS,
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
    label: "Instructions *",
    isRequired: true,
  },
  {
    fieldName: "notes",
    placeholder: "Enter Notes",
    label: "Notes",
    isRequired: false,
  },
];
const DEFAULT_INSTRUCTION = [{ step_count: "", instructions: "", notes: "" }];
const DEFAULT_INGREDIENT = [{ name: "", quantity: "", unit_of_measure: "" }];

const RecipeAddEdit = () => {
  const navigate = useNavigate();
  const { pageLoader, toggleLoader } = useLoader();
  const params = useParams();
  const formConfig = useForm({
    defaultValues: {
      ingredients: [{ name: "", quantity: "", unit_of_measure: "" }],
      instructions: [{ step_count: "", instructions: "", notes: "" }],
    },
  });
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = formConfig;

  const [btnLoaders, setBtnLoaders] = useState({
    publish: false,
    draft: false,
  });
  const [file, setFile] = useState();

  useEffect(() => {
    if (params?.receipe_id) {
      toggleLoader("pageLoader");
      makeApiRequest({
        endPoint: `${RECIPE_ENDPOINT}${params?.receipe_id}/`,
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
            "description",
            // "ingredients",
            // "instructions",
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

          setValue("difficulty_level", difficultyOption);
          setValue("allergen_information", allergenOption);
          setValue("dietary_plan", dietryOption);
          if (response?.instructions?.length) {
            setValue("instructions", response?.instructions);
          } else {
            setValue("instructions", DEFAULT_INSTRUCTION);
          }
          if (response?.ingredients?.length) {
            const formattedIngredients = handleIngredients(
              response?.ingredients
            );
            console.log(formattedIngredients, "formattedIngredients");
            setValue("ingredients", formattedIngredients);
          } else {
            setValue("ingredients", DEFAULT_INGREDIENT);
          }
          setValue("category", handleCategory(response?.category));
          if (response?.recipe_images?.length) {
            setFile({
              file: null,
              preview: createPreview(response?.recipe_images?.[0]?.image),
            });
          }
          // for prefilling values that requires custom logic
        })
        .catch((err) => {
          toastMessage("Recipe not found");
          navigate("/recipe");
        })
        .finally(() => {
          toggleLoader("pageLoader");
        });
    }
  }, []);

  const onSubmit = (values, event) => {
    // if (file?.error) {
    //   return;
    // }
    const buttonType = event.nativeEvent.submitter.name;
    setBtnLoaders({ ...btnLoaders, [buttonType]: !btnLoaders[buttonType] });
    // creating payload
    const payload = {
      ...values,
      preparation_time: +values?.preparation_time,
      serving_size: +values?.serving_size,
      cook_time: +values?.cook_time,
      instructions: appendStepCountInObject(values?.instructions),
      ingredients: createIngredientPayload(values?.ingredients),
      difficulty_level: values?.difficulty_level?.value,
      dietary_plan: values?.dietary_plan?.value,
      allergen_information: values?.allergen_information?.value,
      status: buttonType === "publish" ? "True" : "False",
      // update required make this category key dynamic
      // category: +6,
      // Converting catgeory array elements to
      category: values?.category.map(Number),
    };
    console.log("this is payload", payload);
    // converting payload into formdata
    const formData = new FormData();
    for (let key in payload) {
      if (
        key === "ingredients" ||
        key === "instructions" ||
        key === "category"
      ) {
        // because these are array of objects and to pass these in form data we need to pass it as stringified
        const striginfiedResult = JSON.stringify(payload[key]);
        formData.append(key, striginfiedResult);
      } else {
        formData.append(key, payload[key]);
      }
    }

    // Appending files here
    // files.forEach(({ file }) => {
    //   if (file) {
    //     formData.append("recipe_images", file);
    //   }
    // });
    if (file?.file) {
      formData.append("recipe_images", file?.file);
    }

    // Appending files here

    const data = Object.fromEntries(formData.entries()); // Convert to object
    // if receipe id is there in the params means it is a edit scenario
    makeApiRequest({
      endPoint: RECIPE_ENDPOINT,
      payload: formData,
      method: params?.receipe_id ? METHODS?.patch : METHODS?.post,
      update_id: params?.receipe_id && params?.receipe_id,
      instanceType: INSTANCE.formInstance,
    })
      .then(() => {
        toastMessage(
          `Recipe ${params?.receipe_id ? "updated" : "added"} successfully`,
          successType
        );
        navigate("/recipe");
      })
      .catch((err) => {
        const recipeError = err?.response?.data?.error;
        if (recipeError.includes("duplicate key")) {
          toastMessage("Recipe name with this title already exists ");
        } else {
          toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
        }
      })
      .finally(() => {
        setBtnLoaders({ publish: false, draft: false });
      });
  };

  return (
    <div>
      {pageLoader ? (
        <PageLoader />
      ) : (
        <div className="flex">
          <FormWrapper
            formConfig={formConfig}
            onSubmit={onSubmit}
            isCustomButtons={true}
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-4">
                <div>
                  <div>
                    <CommonTextField
                      formConfig={formConfig}
                      label="Recipe Title *"
                      fieldName="recipe_title"
                      placeholder="Enter Recipe Title"
                      className="px-4 py-2 w-full rounded-lg"
                      labelClassName=""
                      rules={{
                        ...createRequiredValidation("Recipe title"),
                        pattern: {
                          value: SPECIAL_CHARACTERS_REGEX,
                          message: "Special characters are not allowed",
                        },
                      }}
                    />
                    <div className="description mt-4 p-4 rounded-lg bg-white mt-4">
                      <CommonTextEditor
                        label="Description *"
                        fieldName="description"
                        formConfig={formConfig}
                        placeholder="Type..."
                        requiredMessage="Description field is required" //validations works a bit different in text editor that's why
                      />
                    </div>

                    <div className="px-4 py-2 rounded-lg bg-white mt-4">
                      <div className="recipe-section-two">
                        <div className="sec-1 flex gap-4 mt-2">
                          <div className="flex-1">
                            <CommonTextField
                              formConfig={formConfig}
                              label="Preparation Time (in minutes) *"
                              fieldName="preparation_time"
                              placeholder="Enter the prep time in minutes or hours"
                              labelClassName=""
                              className="recipe-input"
                              rules={{
                                ...createRequiredValidation("Preparation time"),
                                ...RecipeValidations["preparation_time"],
                              }}
                              isNumberOnly={true}
                            />
                          </div>
                          <div className="flex-1">
                            <CommonTextField
                              formConfig={formConfig}
                              label="Cook Time (in minutes) *"
                              fieldName="cook_time"
                              placeholder="Enter the cook time"
                              className="recipe-input"
                              rules={{
                                ...createRequiredValidation("Cook time"),
                                ...RecipeValidations["cook_time"],
                              }}
                              isNumberOnly={true}
                            />
                          </div>
                        </div>

                        <div className="sec-2 mt-2 flex gap-4">
                          <div className="flex-1">
                            <CommonTextField
                              formConfig={formConfig}
                              label="Serving Size *"
                              fieldName="serving_size"
                              placeholder="Number of servings the recipe make."
                              className="recipe-input"
                              rules={{
                                ...createRequiredValidation("Serving size"),
                                ...RecipeValidations["serving_size"],
                              }}
                              isNumberOnly={true}
                            />
                          </div>
                          <div className="flex-1">
                            <CommonSelect
                              formConfig={formConfig}
                              label="Difficulty Level *"
                              fieldName="difficulty_level"
                              placeholder="Select difficulty level"
                              className="bg-[#F5F5F5] w-full border border-gray-300 rounded-md focus:outline-none"
                              selectType="react-select"
                              options={DIFFICULTY_OPTIONS}
                              rules={createRequiredValidation(
                                "Difficulty level"
                              )}
                            />
                          </div>
                        </div>

                        <div className="ingredients-section mt-4">
                          <CommonFieldArray
                            heading="Ingredients"
                            fieldArrayName="ingredients"
                            formConfig={formConfig}
                            itemToAppend={INGREDIENT_TO_APPEND}
                            items={INGREDIENTS_ITEMS}
                          />
                        </div>
                        <div className="instructions-section mt-4">
                          <CommonFieldArray
                            heading="Instructions/Steps"
                            fieldArrayName="instructions"
                            formConfig={formConfig}
                            itemToAppend={INSTRUCTION_TO_APPEND}
                            items={INSTRUCTION_ITEMS}
                          />
                        </div>

                        <div className="dietry-section flex items-center space-x-4 mt-4 flex">
                          {/* may be need to update this field into text field further */}
                          <div className="flex-1">
                            <CommonSelect
                              label="Dietary Information *"
                              selectType="creatable"
                              options={DIETRY_OPTIONS}
                              fieldName="dietary_plan"
                              formConfig={formConfig}
                              placeholder="Select"
                              rules={RecipeValidations["dietary_plan"]}
                            />
                          </div>
                          <div className="flex-1">
                            <CommonSelect
                              label="Allergen Informations *"
                              selectType="creatable"
                              options={ALLERGEN_OPTIONS}
                              fieldName="allergen_information"
                              formConfig={formConfig}
                              placeholder="Select"
                              rules={RecipeValidations["allergen_informations"]}
                            />
                          </div>
                        </div>
                        <div className="notes mt-4">
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
                    </div>
                  </div>
                </div>
                <div className="button-section flex flex-col">
                  <div className="flex justify-center gap-4 mb-4">
                    <CommonButton
                      type="submit"
                      text="Publish"
                      icon={publishIcon}
                      className="orange_btn"
                      name="publish"
                      loader={btnLoaders?.publish}
                      disabled={btnLoaders?.publish || btnLoaders?.draft}
                    />
                    <CommonButton
                      type="submit"
                      text="Draft"
                      icon={draftIcon}
                      className="orange_btn"
                      name="draft"
                      loader={btnLoaders?.draft}
                      disabled={btnLoaders?.publish || btnLoaders?.draft}
                    />
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
          </FormWrapper>
          <div className="-ml-[252px] mt-[70px]">
            <CategorySection
              formConfig={formConfig}
              fieldName="category"
              rules={createRequiredValidation("Category")}
            />
            <div className="recipe-image-upload">
              <ImageUploadSection
                file={file}
                setFile={setFile}
                label="Recipe Image"
                accept={PNG_AND_JPG}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeAddEdit;
