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
  SAME_PRODUCT_NAME_ERROR,
} from "../constant";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { PRODUCT_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { SPECIAL_CHARACTERS_REGEX } from "../regex/regex";
import MultipleImageUploadField from "../Form Fields/MultipleImageUploadField";
import useLoader from "../hooks/useLoader";
import PageLoader from "../loaders/PageLoader";
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
  const { pageLoader, toggleLoader } = useLoader();
  const navigate = useNavigate();
  const formConfig = useForm({
    defaultValues: {
      bulking_price_rules: DEFAULT_BULKING_PRICE,
      preview_as: "desktop",
      // variants: DEFAULT_VARIANTS_DATA, update
    },
    mode: "onChange", // Trigger validation on every change

    shouldUnregister: false,
  });
  const {
    watch,
    register,
    getValues,
    trigger,
    setValue,
    formState: { errors },
  } = formConfig;
  const [activeTab, setActiveTab] = useState("inventory");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productImageError, setProductImageError] = useState([]);
  const [snippetInfo, setSnippetInfo] = useState({
    seo_title: "",
    slug: "",
    meta_description: "",
  });
  const [btnLoaders, setBtnLoaders] = useState({
    publish: false,
    draft: false,
  });
  const [isSnippetEdit, setIsSnippetEdit] = useState(false);

  useEffect(() => {
    if (editId) {
      toggleLoader("pageLoader");
      makeApiRequest({
        endPoint: `${PRODUCT_ENDPOINT}${editId}`,
        method: METHODS.get,
      })
        .then((res) => {
          const data = res?.data;
          console.log(res?.data, "this is response");
          // Setting seo snippet section
          const seoSnippetData = {
            seo_title: data?.product_seo?.seo_title,
            slug: data?.product_seo?.slug,
            meta_description: data?.product_seo?.meta_description,
          };
          setSnippetInfo(seoSnippetData);
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

          // for filling images
          // if (data?.featured_image) {
          //   preview = createPreview(data?.featured_image);
          //   setFile(createPreview);
          // }
          // if (data?.product_images?.length) {
          //   let result = [];
          //   const product_images = data.product_images;

          //   productImages?.forEach((img) => {
          //     const item = { preview: img, error: null, file: null };
          //     result.push(item);
          //   });
          //   setProductImages(result);
          // }
          // for filling images
        })
        .catch((err) => {
          console.log(err);
          toastMessage("Invalid product id");
          // navigate("/products");
        })
        .finally(() => {
          toggleLoader("pageLoader");
        });
    }
  }, [editId]);
  const onSubmit = (values, event) => {
    console.log("inside on submit");
    const buttonType = event.nativeEvent.submitter.name;
    setBtnLoaders({ ...btnLoaders, [buttonType]: !btnLoaders[buttonType] });
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
      formData.append("featured_image", featuredImage?.file);
    }

    productImages?.forEach((productImage) => {
      if (productImage?.file) {
        formData.append("product_images[]", productImage.file);
      }
    });

    const data = Object.fromEntries(formData.entries()); // Convert to object
    console.log(data, "formData payload");
    // api call
    makeApiRequest({
      endPoint: PRODUCT_ENDPOINT,
      method: editId ? METHODS.patch : METHODS.post,
      payload: formData,
      instanceType: INSTANCE.formInstance,
      update_id: editId,
    })
      .then((res) => {
        toastMessage(
          `Product ${editId ? "Updated" : "Created"} Successfully`,
          successType
        );
        setBtnLoaders({ publish: false, draft: false });
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
        // const error =
        //   err?.response?.data?.name?.[0] || err?.response?.data?.sku?.[0];
        // toastMessage(error || DEFAULT_ERROR_MESSAGE);

        const fieldError = err?.response?.data?.error;
        setBtnLoaders({ publish: false, draft: false });

        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      });
  };
  const handleActiveTab = async (tabName) => {
    const shouldChange = await shouldChangeTab(activeTab);
    console.log(shouldChange, "shouldChange");
    if (shouldChange) {
      setActiveTab(tabName);
    }
  };
  const shouldChangeTab = async (activeTab) => {
    if (activeTab === "inventory") {
      const inventoryFields = [
        "sale_price_dates_from",
        "sale_price_dates_to",
        "weight",
        "unit",
        "sku",
        "sale_price",
        "regular_price",
        "bulking_price_rules",
      ];

      // Use map to create an array of promises
      const validations = await Promise.all(
        inventoryFields.map((field) => trigger(field))
      );

      console.log(validations, "validations");

      // Check if all validations are true
      const shouldChangeTab = validations.every((it) => it === true);
      return shouldChangeTab;
    } else if (activeTab === "variations") {
      const variantResult = await trigger("variants");
      return variantResult;
    } else {
      return true;
    }
  };

  // const fillForm = () => {
  //   setValue("name", "Dummy Product Name");
  //   setValue("product_tag", { label: "Hot Deals", value: "hot-deals" });
  //   setValue("focused_keyword", { label: "keyword1", value: "keyword" });
  //   setValue("seo_title", "Dummy Seo title");
  //   setValue("slug", "Dummy slug");
  //   setValue("meta_description", "Dummy meta description");
  //   setValue("sku", "qweert1");
  //   setValue("regular_price", "1234");
  //   setValue("sale_price", "123213");
  //   setValue("sale_price_dates_from", "2024-11-28");
  //   setValue("sale_price_dates_to", "2024-11-29");
  //   setValue("unit", { label: "Kilogram", value: "kg" });
  //   setValue("weight", "123");
  //   setValue("preview_as", "desktop");
  //   setValue("bulking_price_rules", [
  //     { quantity_from: 12, quantity_to: 20, price: "1213" },
  //   ]);
  //   setSnippetInfo({
  //     seo_title: "",
  //     slug: "",
  //     meta_description: "",
  //   });
  // };
  return (
    <>
      {pageLoader ? (
        <PageLoader />
      ) : (
        <>
          <div className="flex">
            <FormWrapper
              formConfig={formConfig}
              onSubmit={onSubmit}
              isCustomButtons={true}
            >
              {/* <CommonButton
          text="Fill form"
          type="button"
          className="orange_button"
          onClick={fillForm}
        /> */}
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
                          className="mt-2 border-1 border-solid border-black-500 rounded"
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
                        className="mt-2 border-2 border-solid border-black-500 rounded"
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
                      <div
                        className="snippet mb-4"
                        style={{
                          width: watch("preview_as") === "mobile" && "50%",
                        }}
                      >
                        {/* update required: need to integrate this section */}
                        <div className="border p-4 space-y-2 rounded-lg mt-4 shadow-md">
                          <div className="text-black">
                            {snippetInfo?.seo_title || "Title"}
                          </div>
                          <div className="text-[#FF6D2F]">
                            {snippetInfo?.slug || "Slug"}
                          </div>
                          <div className="text-[#666666]">
                            {snippetInfo?.meta_description ||
                              "Meta Description"}
                          </div>
                        </div>
                        {!isSnippetEdit && !isViewOnly && (
                          <CommonButton
                            text="Edit Snippet"
                            onClick={() => {
                              setIsSnippetEdit(true);
                            }}
                            icon={pencilIcon}
                            type="button"
                            disabled={isViewOnly}
                            className="buttonTwo bg-[#FF6D2F] flex px-4 py-2 rounded-lg mt-4 gap-4 text-white items-center"
                          />
                        )}
                      </div>
                      <CommonTextField
                        fieldName="seo_title"
                        disabled={isViewOnly || !isSnippetEdit}
                        label="SEO Title *"
                        rules={createRequiredValidation("SEO title")}
                        placeholder="Enter SEO Title"
                        formConfig={formConfig}
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all my-2"
                      />
                      <CommonTextField
                        fieldName="slug"
                        label="Slug *"
                        disabled={isViewOnly || !isSnippetEdit}
                        rules={createRequiredValidation("Slug")}
                        placeholder="Enter Page Slug"
                        formConfig={formConfig}
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all my-2"
                      />
                      <div></div>
                      <CommonTextField
                        fieldName="meta_description"
                        disabled={isViewOnly || !isSnippetEdit}
                        label="Meta Description"
                        // rules={createRequiredValidation("Meta Description")}
                        placeholder="Enter Meta Description"
                        formConfig={formConfig}
                        type="textarea"
                        rows={4}
                        maxlength={250}
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all my-2"
                      />
                      <div className="max-limit">Max.250 characters</div>
                      {isSnippetEdit && !isViewOnly && (
                        <CommonButton
                          text="Update Snippet"
                          onClick={() => {
                            setIsSnippetEdit(false);
                            setSnippetInfo({
                              seo_title: watch("seo_title"),
                              slug: watch("slug"),
                              meta_description: watch("meta_description"),
                            });
                          }}
                          type="button"
                          className="updateSnippet"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* side section */}
                <div className="flex flex-col">
                  <div className="button-section flex justify-center">
                    <CommonButton
                      text="Publish"
                      name="publish"
                      type="submit"
                      className="orange_btn"
                      loader={btnLoaders?.publish}
                      disabled={
                        btnLoaders?.publish || btnLoaders?.draft || isViewOnly
                      }
                      icon={publishIcon}
                    />
                    <CommonButton
                      text="Draft"
                      name="draft"
                      type="submit"
                      className="orange_btn"
                      icon={draftIcon}
                      loader={btnLoaders?.draft}
                      disabled={
                        btnLoaders?.publish || btnLoaders?.draft || isViewOnly
                      }
                    />
                  </div>
                </div>
              </div>
            </FormWrapper>
            <div className="flex flex-col gap-4 mt-4 -ms-[252px] mt-[70px]">
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
        </>
      )}
    </>
  );
};

export default AddEditProduct;
