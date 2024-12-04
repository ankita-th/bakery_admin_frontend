import React, { useEffect, useState } from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import {
  convertSelectOptionToValue,
  createRequiredValidation,
  extractOption,
  prefillFormValues,
} from "../utils/helpers";
import FormWrapper from "../Wrappers/FormWrapper";
import CommonButton from "./Common/CommonButton";
import { draftIcon, publishIcon } from "../assets/Icons/Svg";
import CommonSelect from "../Form Fields/CommonSelect";
import { DEFAULT_ERROR_MESSAGE, DISCOUNT_TYPE_OPTIONS, INVALID_ID } from "../constant";
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
import DiscountUses from "./Common/DiscountUses";

const AmountOffProduct = ({location}) => {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const formConfig = useForm();
  const { watch, setValue } = formConfig;

  const [btnLoaders, setBtnLoaders] = useState({
    draft: false,
    saveDiscount: false,
  });

  const isEdit = location?.state?.isEdit;

  const editId = location?.state?.editId;

  useEffect(() => {
    if (isEdit) {
      makeApiRequest({
        endPoint: `${DISCOUNT_ENDPOINT}${editId}`,
        method: METHODS.get,
      })
        .then((res) => {
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
            "maximum_usage_value",
            // "maximum_discount_usage",
          ];
          console.log(res.data, "skdfjkslfjklsadfj");
          prefillFormValues(res.data, fields, setValue);
          setValue("applies_to",res?.data?.applies_to);
          setValue("discount_types",res?.data?.discount_types)
        })
        .catch((err) => {
          console.log(err);
          toastMessage(err?.response?.data?.name?.[0] || INVALID_ID);
          navigate("/discounts");
        });
    }
  }, []);

  const onSubmit = (values, event) => {
    const buttonType = event.nativeEvent.submitter.name;
    // setBtnLoaders({ ...btnLoaders, [buttonType]: !btnLoaders[buttonType] });
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
      "maximum_usage_value",
      // "maximum_discount_usage",
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
          payload[key] = values[key];
        } else if (
          key === "discount_value" ||
          key === "maximum_usage_value" ||
          key === "minimum_quantity_value" ||
          key === "minimum_purchase_value"
        ) {
          payload[key] = +values[key];
        } else {
          payload[key] = values[key];
        }
      }
    });
    payload = {
      ...payload,
      product: values?.products?.[0]?.value && values?.products?.[0]?.value,
    };
    console.log(payload, "this is payload");
    makeApiRequest({
      endPoint: DISCOUNT_ENDPOINT,
      method: METHODS.post,
      payload: payload,
    })
      .then((res) => {
        toastMessage("Discount created successfully", successType);
        navigate("/discounts");
      })
      .catch((err) => {
        console.log(err);
        toastMessage(err?.response?.data?.name?.[0] || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setBtnLoaders({ ...btnLoaders, [buttonType]: false });
      });
  };
  console.log(watch("maximum_discount_usage"), "form value");
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
          <DiscountUses formConfig={formConfig} />
          <Combinations formConfig={formConfig} />
          <ActiveDates formConfig={formConfig} />
        </div>
        {/* sidebar */}
        <DiscountSideSection btnLoaders={btnLoaders}>
          <SummarySection formConfig={formConfig} />
        </DiscountSideSection>
      </div>
    </FormWrapper>
  );
};

export default AmountOffProduct;
