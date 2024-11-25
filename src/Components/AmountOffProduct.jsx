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
import { DISCOUNT_TYPE_OPTIONS } from "../constant";
import GenrateRandomCode from "./Common/GenrateRandomCode";
import CustomerEligibility from "./Common/CustomerEligibility";
import Combinations from "./Common/Combinations";
import ActiveDates from "./Common/ActiveDates";
import MinimumPurchaseRequirement from "./Common/MinimumPurchaseRequirement";
import { useForm } from "react-hook-form";
import SummarySection from "./Common/SummarySection";
import AppliesTo from "./Common/AppliesTo";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { DISCOUNT_ENDPOINT, PRODUCT_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import DiscountSideSection from "./DiscountSideSection";
import DiscountCodeSection from "./Common/DiscountCodeSection";
import DiscountTypeAndValue from "./Common/DiscountTypeAndValue";

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
      "end_time",
    ];
    const coupon_type = "amount_off_product";
    let payload = {
      coupon_type: coupon_type,
      applies_to: convertSelectOptionToValue(values?.applies_to), //for onverting {label:"vssd",value:"sdf"} into sdf
      discount_types: convertSelectOptionToValue(values?.discount_types),
    };
    fields.forEach((key) => {
      if (values?.[key]) {
        if (key === "combination") {
          payload[key] = values[key][0];
        } else {
          payload[key] = values[key];
        }
      }
    });
    payload = {
      ...payload,
      product: "Crosionr",
    };

    makeApiRequest({
      endPoint: DISCOUNT_ENDPOINT,
      method: METHODS.post,
      payload: payload,
    })
      .then((res) => {
        toastMessage("Discount created successfully", successType);
        navigate("/discounts");
        console.log(res, "this is response");
      })
      .catch((err) => {
        console.log(err);
      });
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
          <DiscountCodeSection formConfig={formConfig} />

          {/* second */}

          <div className="bg-white p-6 rounded-lg">
            <DiscountTypeAndValue formConfig={formConfig} />
            <AppliesTo formConfig={formConfig} />
          </div>

          <MinimumPurchaseRequirement formConfig={formConfig} />
          <CustomerEligibility formConfig={formConfig} />
          <Combinations formConfig={formConfig} />
          <ActiveDates formConfig={formConfig} />
        </div>
        {/* sidebar */}
        <DiscountSideSection>
          <SummarySection formConfig={formConfig} />
        </DiscountSideSection>
      </div>
    </FormWrapper>
  );
};

export default AmountOffProduct;
