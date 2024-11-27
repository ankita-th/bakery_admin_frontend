import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import CommonTextEditor from "../Form Fields/CommonTextEditor";
import RadioGroup from "../Form Fields/RadioGroup";
import CommonSelect from "../Form Fields/CommonSelect";
import CommonTextField from "../Form Fields/CommonTextField";
import {
  convertSelectOptionToValue,
  convertValuesIntoLabelAndValue,
  createAdvancedPayload,
  createInventoryPayload,
  createProductSeo,
  createRequiredValidation,
  createVariantPayload,
  extractOption,
  extractSelectOptions,
  handleCategory,
  prefillFormValues,
} from "../utils/helpers";
import CommonButton from "../Components/Common/CommonButton";
import { draftIcon, pencilIcon, publishIcon } from "../assets/Icons/Svg";
import ProductDataSection from "../Components/ProductDataSection";
import CategorySection from "../Components/CategorySection";
import ImageUploadSection from "../Form Fields/ImageUploadSection";
import {
  allowedImageTypes,
  DEFAULT_ERROR_MESSAGE,
  MEASURE_OPTIONS,
  PNG_AND_JPG,
} from "../constant";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { PRODUCT_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { SPECIAL_CHARACTERS_REGEX } from "../regex/regex";
import MultipleImageUploadField from "../Form Fields/MultipleImageUploadField";
const options = [
  { label: "option1", value: "options1" },
  { label: "option2", value: "options2" },
  { label: "option3", value: "options3" },
  { label: "option4", value: "options4" },
];
const PRODUCT_TAG_OPTIONS = [{ label: "Hot Deals", value: "hot-deals" }];
const DEFAULT_BULKING_PRICE = [
  {
    quantity_from: null,
    quantity_to: null,
    price: "",
  },
];

const DEFAULT_VARIANTS_DATA = [
  {
    sku: "",
    regular_price: "",
    sale_price: "",
    sale_price_dates_from: "",
    sale_price_dates_to: "",
    quantity: null,
    weight: "",
    unit: "",
    enabled: false,
    managed_stock: false,
    allow_backorders: "",
    description: "",
  },
];

const PREVIEW_AS_OPTIONS = [
  { value: "desktop", label: "Desktop Result" },
  { value: "mobile", label: "Mobile Result" },
];
const AddEditProduct = () => {
  const location = useLocation();
  const editId = location?.state?.id;
  const isViewOnly = location?.state?.isViewOnly;
  const navigate = useNavigate();
  console.log(location, "isViewOnly");
  const formConfig = useForm({
    defaultValues: {
      bulking_price_rules: DEFAULT_BULKING_PRICE,
      variants: DEFAULT_VARIANTS_DATA,
    },

    reValidateMode: "onChange",
  });
  const { watch, register, setValue } = formConfig;
  const [activeTab, setActiveTab] = useState("inventory");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productImageError, setProductImageError] = useState([]);

  console.log(featuredImage, "featured image");
  useEffect(() => {
    if (editId) {
      makeApiRequest({
        endPoint: `${PRODUCT_ENDPOINT}${editId}`,
        method: METHODS.get,
      })
        .then((res) => {
          const data = res?.data;
          console.log(res?.data, "this is response");
          // for directly prefilling form values

          // for name and desription
          const prefillKeys = ["name", "description"];
          prefillFormValues(data, prefillKeys, setValue);
          // for name and desription

          // for seo section
          const seoKeys = [
            "meta_description",
            "preview_as",
            "seo_title",
            "slug",
          ];
          prefillFormValues(data?.product_seo, seoKeys, setValue);
          setValue("category", handleCategory(data?.category));
          // for seo section

          // for categories section
          setValue(
            "focused_keyword",
            convertValuesIntoLabelAndValue(data?.product_seo?.focused_keyword)
          );
          // for categories section

          // for advanced tab
          const advanceTabKeys = ["purchase_note", "min_order_quantity"];
          prefillFormValues(
            data?.product_detail?.advanced,
            advanceTabKeys,
            setValue
          );

          // for advanced tab

          // for inventory
          const inventoryKeys = [
            "regular_price",
            "sale_price",
            "sale_price_dates_from",
            "sale_price_dates_to",
            "sku",
            "weight",
            "bulking_price_rules",
          ];
          prefillFormValues(
            data?.product_detail?.inventory,
            inventoryKeys,
            setValue
          );
          setValue(
            "unit",
            extractOption(
              MEASURE_OPTIONS,
              data?.product_detail?.inventory?.unit,
              "value"
            )
          );
          // for inventory
          // for prefilling form values with custom logic
          setValue(
            "product_tag",
            convertValuesIntoLabelAndValue(data?.product_tag)
          );
          // for variants
          setValue("variants", data?.product_detail?.variants);
          // for variants
        })
        .catch((err) => {
          console.log(err);
          toastMessage("Invalid product id");
          // navigate("/products");
        });
    }
  }, [editId]);
  const onSubmit = (values, event) => {
    console.log(values, "these are values");
    const buttonType = event.nativeEvent.submitter.name;
    const payload = {
      name: values?.name,
      status: buttonType === "publish",
      description: values?.description,
      product_tag: extractSelectOptions(values?.product_tag, "value"),
      category: values?.category.map(Number),
      product_seo: createProductSeo(values),
      product_detail: {
        inventory: createInventoryPayload(values),
        variants: createVariantPayload(values),
        advanced: createAdvancedPayload(values),
      },
    };

    // converting payload in form data

    console.log(payload, " product payload");
    const formData = new FormData();
    for (let key in payload) {
      if (
        key === "product_tag" ||
        key === "product_seo" ||
        key === "product_detail" ||
        key === "category"
      ) {
        const striginfiedResult = JSON.stringify(payload[key]);
        formData.append(key, striginfiedResult);
      } else {
        formData.append(key, payload[key]);
      }
    }

    // appending files
    if (featuredImage?.file) {
      formData.append("images", featuredImage?.file);
    }

    productImages?.forEach((productImage) => {
      if (productImage?.file) {
        formData.append("images[]", productImage.file);
      }
    });

    const data = Object.fromEntries(formData.entries()); // Convert to object
    console.log(data, "formData payload");
    // api call
    // makeApiRequest({
    //   endPoint: PRODUCT_ENDPOINT,
    //   method: editId ? METHODS.patch : METHODS.post,
    //   payload: formData,
    //   instanceType: INSTANCE.formInstance,
    //   update_id: editId,
    // })
    //   .then((res) => {
    //     toastMessage(
    //       `Product ${editId ? "Updated" : "Created"} Successfully`,
    //       successType
    //     );
    //     navigate("/products");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
    //   });
  };
  const handleActiveTab = (tabName) => {
    setActiveTab(tabName);
  };
  console.log(productImages, "these are poduct image");

  return (
    <>
      <FormWrapper
        formConfig={formConfig}
        onSubmit={onSubmit}
        isCustomButtons={true}
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="product-info-section mb-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <CommonTextField
                    fieldName="name"
                    label="Product Name *"
                    rules={{
                      ...createRequiredValidation("Product name"),
                      pattern: {
                        value: SPECIAL_CHARACTERS_REGEX,
                        message: "Special characters are not allowed",
                      },
                    }}
                    placeholder="Product Name"
                    formConfig={formConfig}
                    disabled={isViewOnly}
                    className="px-4 py-2 bg-white focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all mt-2"
                  />
                </div>
                <div className="flex-1">
                  <CommonSelect
                    fieldName="product_tag"
                    selectType="creatable"
                    disabled={isViewOnly}
                    rules={createRequiredValidation(
                      null,
                      "Product tags are required"
                    )}
                    options={PRODUCT_TAG_OPTIONS}
                    isMulti={true}
                    formConfig={formConfig}
                    label="Product Tags *"
                    placeholder="Select Tags"
                  />
                </div>
              </div>
            </div>
            <div className="description mt-4 p-4 rounded-lg bg-white my-4">
              <CommonTextEditor
                formConfig={formConfig}
                disabled={isViewOnly}
                label="Description *"
                fieldName="description"
                placeholder="Type..."
                // rules={} // for this required validation cannot be passed through rules because it has some different way to handle required validation
                requiredMessage={"Description is required"} // if this prop is not passed required validation is not applied
              />
            </div>

            <ProductDataSection
              formConfig={formConfig}
              disabled={isViewOnly}
              activeTab={activeTab}
              handleActiveTab={handleActiveTab}
            />
            <div className="seo-section mt-4 bg-white p-4 rounded-lg">
              <div className="w-3/5">
                <h5 className="text-black font-medium">SEO</h5>
                <CommonSelect
                  fieldName="focused_keyword"
                  disabled={isViewOnly}
                  selectType="creatable"
                  // options={PRODUCT_TAG_OPTIONS}
                  isMulti={true}
                  rules={createRequiredValidation()}
                  formConfig={formConfig}
                  label="Focus Keyphrase"
                  placeholder="Enter Keywords You Need To Focus"
                />{" "}
                <div className="flex gap-8 mt-4">
                  <div>Preview as:</div>
                  <RadioGroup
                    fieldName="preview_as"
                    disabled={isViewOnly}
                    formConfig={formConfig}
                    options={PREVIEW_AS_OPTIONS}
                    className="flex gap-4"
                    // rules={createRequiredValidation()}
                  />
                </div>
                <div className="snippet mb-4">
                  {/* update required: need to integrate this section */}
                  <div className="border p-4 space-y-2 rounded-lg mt-4 shadow-md">
                    <div className="text-black">The Bakery</div>
                    <div className="text-[#FF6D2F]">
                      https://www.bakery.com/
                    </div>
                    <div className="text-[#666666]">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an unknown printer took a
                      galley of type and scrambled it to make a type specimen
                      book. It has survived not only five centuries, but also...
                    </div>
                  </div>
                  <CommonButton
                    text="Edit Snippet"
                    onClick={() => {}}
                    icon={pencilIcon}
                    type="button"
                    disabled={isViewOnly}
                    className="buttonTwo bg-[#FF6D2F] flex px-4 py-2 rounded-lg mt-4 gap-4 text-white items-center"
                  />
                </div>
                <CommonTextField
                  fieldName="seo_title"
                  disabled={isViewOnly}
                  label="SEO Title *"
                  rules={createRequiredValidation("SEO title")}
                  placeholder="Enter SEO Title"
                  formConfig={formConfig}
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all my-2"
                />
                <CommonTextField
                  fieldName="slug"
                  label="Slug *"
                  disabled={isViewOnly}
                  rules={createRequiredValidation("Slug")}
                  placeholder="Enter Page Slug"
                  formConfig={formConfig}
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all my-2"
                />
                <CommonTextField
                  fieldName="meta_description"
                  disabled={isViewOnly}
                  label="Meta Description"
                  // rules={createRequiredValidation("Meta Description")}
                  placeholder="Enter Meta Description"
                  formConfig={formConfig}
                  type="textarea"
                  rows={4}
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all my-2"
                />
              </div>
            </div>
          </div>
          {/* side section */}
          <div className="flex flex-col">
            {!isViewOnly && (
              <div className="button-section flex justify-center">
                <CommonButton
                  text="Publish"
                  name="publish"
                  type="submit"
                  className="orange_btn"
                  icon={publishIcon}
                />
                <CommonButton
                  text="Draft"
                  name="draft"
                  type="submit"
                  className="orange_btn"
                  icon={draftIcon}
                />
              </div>
            )}
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-4 flex-col">
                <CategorySection
                  isViewOnly={isViewOnly}
                  formConfig={formConfig}
                  fieldName="category"
                  rules={createRequiredValidation("Category")}
                />
                <ImageUploadSection
                  file={featuredImage}
                  setFile={setFeaturedImage}
                  label="Featured Image"
                  uniqueId={`featured-image`}
                  accept={PNG_AND_JPG}
                  disabled={isViewOnly}
                />{" "}
                <MultipleImageUploadField
                  files={productImages}
                  setFiles={setProductImages}
                  label="Product Images"
                  allowedTypes={allowedImageTypes}
                  imageError={productImageError}
                  setImageError={setProductImageError}
                  uniqueId={`product-image`}
                  accept={PNG_AND_JPG}
                  uploadButton={{
                    text: "Upload Product Image",
                    class: "image-upload-icon cursor-pointer",
                  }}
                  disabled={isViewOnly}
                />
              </div>
            </div>
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default AddEditProduct;
