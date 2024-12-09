import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import DiscountCodeSection from "../Components/Common/DiscountCodeSection";
import MinimumPurchaseRequirement from "../Components/Common/MinimumPurchaseRequirement";
import CustomerEligibility from "../Components/Common/CustomerEligibility";
import DiscountUses from "../Components/Common/DiscountUses";
import Combinations from "../Components/Common/Combinations";
import ActiveDates from "../Components/Common/ActiveDates";
import DiscountSideSection from "../Components/DiscountSideSection";
import SummarySection from "../Components/Common/SummarySection";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { DISCOUNT_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import {
  CUSTOMER_SPECIFIC_OPTIONS,
  DEFAULT_ERROR_MESSAGE,
  INVALID_ID,
  SWEDEN_COUNTY_OPTIONS
} from "../constant";
import { useNavigate } from "react-router-dom";
import { extractOption, prefillFormValues } from "../utils/helpers";
import Countries from "../Components/Countries";

const FreeShipping = ({ location }) => {
  const navigate = useNavigate();
  const formConfig = useForm();
  const { setValue } = formConfig;
  const [btnLoaders, setBtnLoaders] = useState({
    draft: false,
    saveDiscount: false,
  });

  const isEdit = location?.state?.isEdit;

  const editId = location?.state?.editId;

  useEffect(() => {
    
    // const dummyData = {
    //   "code": "SHIPDISCOUNT2024",
    //   "select_states": "selected_states",
    //   "states": "Kalmar",
    //   "exclude_shipping_rate": true,
    //   "shipping_rate": 10,
    //   "minimum_purchase_requirement": "minimum_purchase",
    //   "minimum_purchase_value": 50,
    //   "minimum_quantity_value": 3,
    //   "customer_eligibility": "specific_customer",
    //   "customer_specification": "purchased_more_than_once",
    //   "maximum_discount_usage": "per_customer",
    //   "maximum_usage_value": 3,
    //   "combination": ["product_discounts", "other_discounts"],
    //   "start_date": "2024-12-12",
    //   "start_time": "15:40",
    //   "end_date": "2024-12-16",
    //   "end_time": "18:42"
    // }
    
    if (isEdit) {
      makeApiRequest({
        endPoint: `${DISCOUNT_ENDPOINT}${editId}`,
        method: METHODS.get,
      })
        .then((res) => {
          const fields = [
            "code",
            "combination",
            "customer_eligibility",
            "customer_specification",
            "end_date",
            "end_time",
            "maximum_discount_usage",
            "maximum_usage_value",
            "minimum_purchase_requirement",
            "minimum_purchase_value",
            "minimum_quantity_value",
            "start_date",
            "start_time",
            "select_states",
            "states",
            // "shipping_check",
            "exclude_shipping_rate",
            "shipping_rate"
          ];
          console.log(res.data, "skdfjkslfjklsadfj");
          prefillFormValues(res.data, fields, setValue);
          // formConfig.reset(res.data);
          // for customer specification
          const extractedOption = extractOption(
            CUSTOMER_SPECIFIC_OPTIONS,
            res?.data?.customer_specification,
            "value"
          );
          setValue("customer_specification", extractedOption);
          const statesExtractedOption = extractOption(SWEDEN_COUNTY_OPTIONS,res?.data?.states,"value")
          setValue("states", statesExtractedOption);
        })
        .catch((err) => {
          console.log(err);
          toastMessage(err?.response?.data?.name?.[0] || INVALID_ID);
          navigate("/discounts");
        });
    }
    // prefillFormValues(dummyData, fields, setValue);
    // const extractedOption = extractOption(
    //   CUSTOMER_SPECIFIC_OPTIONS,
    //   dummyData?.customer_specification,
    //   "value"
    // );
    // setValue("customer_specification", extractedOption);
    // const statesExtractedOption = extractOption(SWEDEN_COUNTY_OPTIONS,dummyData.states,"value")
    // setValue("states", statesExtractedOption);
  }, []);

  const onSubmit = (values, event) => {
    const buttonType = event.nativeEvent.submitter.name;
    console.log(values, "freeshipping");
    const payload = {
      ...values,
      coupon_type: "free_shipping",
      customer_specification: values?.customer_specification?.value,
      minimum_purchase_value: +values?.minimum_purchase_value,
      states: values.states.map((ele)=> ele.value)
    };

    setBtnLoaders({ ...btnLoaders, [buttonType]: !btnLoaders[buttonType] });
    makeApiRequest({
      endPoint: DISCOUNT_ENDPOINT,
      // method: METHODS.post,
      method: isEdit ? METHODS?.patch : METHODS?.post,
      update_id: isEdit && values?.id,
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
            {/* add countries section here */}
            <Countries formConfig={formConfig} />
            <MinimumPurchaseRequirement formConfig={formConfig} />
            <CustomerEligibility formConfig={formConfig} />
            <DiscountUses formConfig={formConfig} />
            <Combinations formConfig={formConfig} isShipping={true} />
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

export default FreeShipping;
