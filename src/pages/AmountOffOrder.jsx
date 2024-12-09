import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import DiscountCodeSection from "../Components/Common/DiscountCodeSection";
import DiscountTypeAndValue from "../Components/Common/DiscountTypeAndValue";
import DiscountUses from "../Components/Common/DiscountUses";
import DiscountedValue from "../Components/DiscountedValue";
import CustomerEligibility from "../Components/Common/CustomerEligibility";
import Combinations from "../Components/Common/Combinations";
import ActiveDates from "../Components/Common/ActiveDates";
import DiscountSideSection from "../Components/DiscountSideSection";
import MinimumPurchaseRequirement from "../Components/Common/MinimumPurchaseRequirement";
import SummarySection from "../Components/Common/SummarySection";
import { DISCOUNT_ENDPOINT } from "../api/endpoints";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { successType, toastMessage } from "../utils/toastMessage";
import {
  CUSTOMER_SPECIFIC_OPTIONS,
  DEFAULT_ERROR_MESSAGE,
  INVALID_ID,
} from "../constant";
import { useNavigate } from "react-router-dom";
import { extractOption, prefillFormValues } from "../utils/helpers";

const AmountOffOrder = () => {
  const navigate = useNavigate();
  const [btnLoaders, setBtnLoaders] = useState({
    draft: false,
    saveDiscount: false,
  });
  const formConfig = useForm();
  const { watch, setValue } = formConfig;
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
            "discount_types",
            "discount_value",
            "minimum_purchase_requirement",
            "minimum_purchase_value",
            "minimum_quantity_value",
            "customer_eligibility",
            "customer_specification",
            "maximum_discount_usage",
            "minimum_quantity_value",
            "combination",
            "end_date",
            "end_time",
            "start_date",
            "start_time",
            "maximum_usage_value",
          ];
          prefillFormValues(res.data, fields, setValue);
          const extractedOption = extractOption(
            CUSTOMER_SPECIFIC_OPTIONS,
            res?.data?.customer_specification,
            "value"
          );
          setValue("customer_specification", extractedOption);
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
    setBtnLoaders({ ...btnLoaders, [buttonType]: !btnLoaders[buttonType] });

    const fields = [
      "code",
      "discount_types",
      "discount_value",
      "minimum_purchase_requirement",
      "minimum_purchase_value",
      "minimum_quantity_value",
      "customer_eligibility",
      "customer_specification",
      "maximum_discount_usage",
      "minimum_quantity_value",
      "combination",
      "end_date",
      "end_time",
      "start_date",
      "start_time",
      "maximum_usage_value",
    ];
    const payload = {};
    fields.forEach((key) => {
      if (values?.[key]) {
        if (key === "customer_specification" || key === "discount_types") {
          payload[key] = values?.[key]?.value;
        } else if (
          key === "discount_value" ||
          key === "minimum_quantity_value" ||
          key === "maximum_usage_value" ||
          key === "minimum_purchase_value"
        ) {
          payload[key] = +values?.[key];
        } else {
          payload[key] = values?.[key];
        }
      }
    });
    console.log(payload, "these are values");
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
  console.log(watch(""), "inside");
  return (
    <div>
      <FormWrapper
        formConfig={formConfig}
        onSubmit={onSubmit}
        isCustomButtons={true}
      >
        <div className="flex gap-6">
          <div className="flex flex-col gap-8 w-3/4">
            <DiscountCodeSection formConfig={formConfig} />
            <DiscountTypeAndValue formConfig={formConfig} />
            <MinimumPurchaseRequirement formConfig={formConfig} />
            <CustomerEligibility formConfig={formConfig} />
            <DiscountUses formConfig={formConfig} />
            {/* <DiscountedValue formConfig={formConfig} /> */}
            <Combinations formConfig={formConfig} />
            <ActiveDates formConfig={formConfig} />
          </div>
          {/* sidebar */}
          <DiscountSideSection btnLoaders={btnLoaders}>
            <SummarySection formConfig={formConfig} />
          </DiscountSideSection>
        </div>
      </FormWrapper>
    </div>
  );
};

export default AmountOffOrder;
