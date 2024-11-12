import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import CommonTextEditor from "../Form Fields/CommonTextEditor";
import RadioGroup from "../Form Fields/RadioGroup";
import CommonSelect from "../Form Fields/CommonSelect";
import ImageUploadSection from "../Form Fields/ImageUploadSection";
import CommonTextField from "../Form Fields/CommonTextField";
import {
  createAdvancedPayload,
  createInventoryPayload,
  createProductSeo,
  createRequiredValidation,
  extractSelectOptions,
} from "../utils/helpers";
import CommonButton from "../Components/Common/CommonButton";
import { draftIcon, pencilIcon, publishIcon } from "../assets/Icons/Svg";
import ProductDataSection from "../Components/ProductDataSection";
const options = [
  { label: "option1", value: "options1" },
  { label: "option2", value: "options2" },
  { label: "option3", value: "options3" },
  { label: "option4", value: "options4" },
];
const PRODUCT_TAG_OPTIONS = [{ label: "Hot Deals", value: "hot-deals" }];

const PREVIEW_AS_OPTIONS = [
  { value: "desktop", label: "Desktop Result" },
  { value: "mobile", label: "Mobile Result" },
];
const AddEditProduct = () => {
  const formConfig = useForm({
    defaultValues: {
      bulking_price_rules: [
        {
          quantity_from: null,
          quantity_to: null,
          price: "",
        },
      ],
    },
  });
  const { watch, register, setValue } = formConfig;
  const [activeTab, setActiveTab] = useState("inventory");
  const onSubmit = (values, event) => {
    console.log(values, "these are values");
    const buttonType = event.nativeEvent.submitter.name;

    const payload = {
      name: values?.name,
      description: values?.description,
      product_tag: extractSelectOptions(values?.product_tag, "value"),
      is_active: buttonType === "publish",
      product_seo: createProductSeo(values),
      product_detail: {
        inventory: createInventoryPayload(values),
        variants: [{}],
        advanced: createAdvancedPayload(values),
      },
    };
    console.log(payload, "this is payload");
  };
  const handleActiveTab = (tabName) => {
    setActiveTab(tabName);
  };

  const fillDummyValues = () => {
    setValue("name", "Premium Breads");
    setValue("sku", 2312445);
    setValue("product_tag", [{ label: "Hot Deals", value: "hot-deals" }]);
    setValue("regular_price", 231);
    setValue("sale_price", 250);
    setValue("weight", 25);
    setValue("unit", { label: "Kilogram", value: "Kg" });
    setValue("bulking_price_rules", [
      { quantity_from: 30, quantity_to: 40, price: "200" },
    ]);
    setValue("sale_price_dates_from", "2024-11-14");
    setValue("sale_price_dates_to", "2024-11-22");
    setValue("seo_title", "Breads");
    setValue("slug", "Dummy Slug");
    setValue("purchase_note", "Dummy Purchase note");
    setValue("minimum_order_quantity", "12");
    setValue("meta_description", "Dummy meta description text");
  };

  return (
    <div>
      <CommonButton
        text="Fill Dummy values"
        className="buttonTwo"
        onClick={fillDummyValues}
      />
      <FormWrapper
        formConfig={formConfig}
        onSubmit={onSubmit}
        isCustomButtons={true}
      >
        <div className="product-info-section">
          <div className="">
            <CommonTextField
              fieldName="name"
              label="Product Name *"
              rules={createRequiredValidation("Product name")}
              placeholder="Enter Product Name"
              formConfig={formConfig}
            />
            <CommonSelect
              fieldName="product_tag"
              selectType="creatable"
              options={PRODUCT_TAG_OPTIONS}
              isMulti={true}
              formConfig={formConfig}
              label="Product Tags"
              placeholder="Select Tags"
            />
          </div>
        </div>
        <div className="description">
          <CommonTextEditor
            formConfig={formConfig}
            label="Description"
            fieldName="description"
            placeholder="Type..."
            // rules={} // for this required validation cannot be passed through rules because it has some different way to handle required validation
            requiredMessage={"Description is required"} // if this prop is not passed required validation is not applied
          />
        </div>

        <ProductDataSection
          formConfig={formConfig}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />

        <div className="seo-section">
          <h5>SEO</h5>
          <CommonSelect
            fieldName="focused_keyword"
            selectType="creatable"
            // options={PRODUCT_TAG_OPTIONS}
            isMulti={true}
            formConfig={formConfig}
            label="Focus Keywords"
            placeholder="Enter Keywords You Need To Focus"
          />{" "}
          <RadioGroup
            fieldName="preview_as"
            formConfig={formConfig}
            options={PREVIEW_AS_OPTIONS}
            // rules={createRequiredValidation()}
          />
          <div className="snippet">
            {/* update required: need to integrate this section */}
            <CommonButton
              text="Edit Snippet"
              onClick={() => {}}
              icon={pencilIcon}
              type="button"
              className="buttonTwo"
            />
          </div>
          <CommonTextField
            fieldName="seo_title"
            label="SEO Title *"
            rules={createRequiredValidation("Product name")}
            placeholder="Enter Product Name"
            formConfig={formConfig}
          />
          <CommonTextField
            fieldName="slug"
            label="Slug *"
            rules={createRequiredValidation("Slug")}
            placeholder="Enter Page Slug"
            formConfig={formConfig}
          />
          <CommonTextField
            fieldName="meta_description"
            label="Meta Description"
            // rules={createRequiredValidation("Meta Description")}
            placeholder="Enter Meta Description"
            formConfig={formConfig}
            type="textarea"
            rows={4}
          />
        </div>
        <div className="button-section">
          <CommonButton
            text="Publish"
            name="publish"
            type="submit"
            className="buttonTwo"
            icon={publishIcon}
          />
          <CommonButton
            text="Draft"
            name="draft"
            type="submit"
            className="buttonTwo"
            icon={draftIcon}
          />
        </div>
      </FormWrapper>
    </div>
  );
};

export default AddEditProduct;
