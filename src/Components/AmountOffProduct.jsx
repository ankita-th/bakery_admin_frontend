import React from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import {
  convertSelectOptionToValue,
  createRequiredValidation,
} from "../utils/helpers";
import FormWrapper from "../Wrappers/FormWrapper";
import CommonButton from "./Common/CommonButton";
import { draftIcon, publishIcon } from "../assets/Icons/Svg";
import CommonSelect from "../Form Fields/CommonSelect";
import { APPLIES_TO_OPTIONS, DISCOUNT_TYPE_OPTIONS } from "../constant";
import GenrateRandomCode from "./Common/GenrateRandomCode";
import CustomerEligibility from "./Common/CustomerEligibility";
import Combinations from "./Common/Combinations";
import ActiveDates from "./Common/ActiveDates";
import MinimumPurchaseRequirement from "./Common/MinimumPurchaseRequirement";
import { useForm } from "react-hook-form";
import SummarySection from "./Common/SummarySection";
import AppliesTo from "./Common/AppliesTo";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { DISCOUNT_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import { useNavigate } from "react-router-dom";

const AmountOffProduct = () => {
  const navigate = useNavigate();
  const formConfig = useForm();
  const { watch, setValue } = formConfig;

  const onSubmit = (values) => {
    console.log(values, "values");
    const {
      code,
      discount_value,
      minimum_purchase_requirement,
      customer_eligibility,
      combination,
      start_date,
      end_date,
      start_time,
      minimum_purchase_value,
      minimum_quantity_value,
    } = values;
    const fields = [
      "code",
      "discount_value",
      "minimum_purchase_requirement",
      "customer_eligibility",
      "combination",
      "start_date",
      "end_date",
      "start_time",
      "minimum_purchase_value",
      "minimum_quantity_value",
    ];
    const coupon_type = "amount_off_product";
    const payload = {
      coupon_type: coupon_type,
      applies_to: convertSelectOptionToValue(values?.applies_to), //for onverting {label:"vssd",value:"sdf"} into sdf
      discount_types: convertSelectOptionToValue(values?.discount_types),
    };
    fields.forEach((key) => {
      if (values?.[key]) {
        payload[key] = values[key];
      }
    });
    makeApiRequest({
      endpoint: DISCOUNT_ENDPOINT,
      method: METHODS.post,
      payload: payload,
    }).then((res) => {
      toastMessage("Discount created successfully", successType);
      navigate("/discounts");
      console.log(res, "this is response");
    });
    console.log(payload, "this is payload");
  };
  return (
    <FormWrapper
      formConfig={formConfig}
      onSubmit={onSubmit}
      isCustomButtons={true}
    >
      <div className="flex gap-6">
        <div className="flex flex-col gap-8 w-3/4">
          {/* first */}
          <GenrateRandomCode fieldName="code" setValue={setValue} />

          <CommonTextField
            label="Discount Code *"
            fieldName="code"
            rules={createRequiredValidation("Discount code")}
            formConfig={formConfig}
            className="px-4 py-2 w-full rounded-lg"
            placeholder="Enter Code"
          />
          <div className="div">Customers must enter this code at checkout.</div>

          {/* second */}

          <div className="bg-white p-6 rounded-lg">
            <CommonSelect
              label="Discount Type *"
              formConfig={formConfig}
              options={DISCOUNT_TYPE_OPTIONS}
              rules={createRequiredValidation("Discount type")}
              fieldName="discount_types"
              selectType="react-select"
              placeholder="Select type"
            />

            <CommonTextField
              label="Discount Value *"
              fieldName="discount_value"
              rules={createRequiredValidation("Discount value")}
              formConfig={formConfig}
              className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
              icon={watch("discount_types")?.value === "percentage" && "%"}
              isNumberOnly={true} // update required: may be need to update into isDecimal
            />
            <AppliesTo formConfig={formConfig} />
          </div>

          <MinimumPurchaseRequirement formConfig={formConfig} />
          <CustomerEligibility formConfig={formConfig} />
          <Combinations formConfig={formConfig} />
          <ActiveDates formConfig={formConfig} />
        </div>
        {/* sidebar */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <CommonButton
              text="Draft"
              name="draft"
              className="px-4 py-2 bg-[#E4E4E4] rounded-lg orange_btn"
              type="submit"
              icon={draftIcon}
            />
            <CommonButton
              text="Save Discount"
              name="save"
              className="px-4 py-2 bg-[#E4E4E4] rounded-lg orange_btn"
              type="submit"
              icon={publishIcon}
            />
          </div>
          <SummarySection formConfig={formConfig} />
        </div>
      </div>
    </FormWrapper>
  );
};

export default AmountOffProduct;
