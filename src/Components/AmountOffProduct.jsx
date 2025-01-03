import React, { useEffect, useState } from "react";
import CommonTextField from "../Form Fields/CommonTextField";
import {
  convertPairFromProducts,
  convertProductsIntoPairs,
  convertSelectOptionToValue,
  createRequiredValidation,
  extractOption,
  prefillFormValues,
} from "../utils/helpers";
import FormWrapper from "../Wrappers/FormWrapper";
import CommonButton from "./Common/CommonButton";
import { draftIcon, publishIcon } from "../assets/Icons/Svg";
import CommonSelect from "../Form Fields/CommonSelect";
import {
  APPLIES_TO_OPTIONS,
  CUSTOMER_SPECIFIC_OPTIONS,
  DEFAULT_ERROR_MESSAGE,
  DISCOUNT_TYPE_OPTIONS,
  INVALID_ID,
} from "../constant";
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
import useLoader from "../hooks/useLoader";
import PageLoader from "../loaders/PageLoader";

const AmountOffProduct = ({ location }) => {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const formConfig = useForm();
  const { watch, setValue } = formConfig;
  const { pageLoader, toggleLoader } = useLoader();

  const [btnLoaders, setBtnLoaders] = useState({
    draft: false,
    saveDiscount: false,
  });

  const isEdit = location?.state?.isEdit;

  const editId = location?.state?.editId;

  useEffect(() => {
    // const dummy_data = {
    //   "applies_to": "specific_products",
    //   "code": "sdafs",
    //   "combination": ["product_discounts", "other_discounts"],
    //   "coupon_type": "amount_off_product",
    //   "customer_eligibility": "specific_customer",
    //   "discount_types": "amount",
    //   "discount_value": 43,
    //   "end_date": "2024-12-16",
    //   "end_time": "18:42",
    //   "maximum_usage_value": 87,
    //   "minimum_purchase_requirement": "minimum_purchase",
    //   "minimum_purchase_value": 98,
    //   "product": [1, 2, 3],
    //   "start_date": "2024-12-12",
    //   "start_time": "15:40",
    //   "minimum_quantity_value": 67,
    //   "customer_specification": "havent_purchased",
    //   "maximum_discount_usage": "per_customer"
    // }

    if (isEdit) {
      toggleLoader("pageLoader");
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
            "maximum_discount_usage",
          ];
          prefillFormValues(res.data, fields, setValue);
          const discountTypesExtractedOption = extractOption(
            DISCOUNT_TYPE_OPTIONS,
            res?.data?.discount_types,
            "value"
          );
          setValue("discount_types", discountTypesExtractedOption);
          const appliesToExtractedOption = extractOption(
            APPLIES_TO_OPTIONS,
            res?.data?.applies_to,
            "value"
          );
          setValue("applies_to", appliesToExtractedOption);
          const customerSpecificationExtractedOption = extractOption(
            CUSTOMER_SPECIFIC_OPTIONS,
            res?.data?.customer_specification,
            "value"
          );
          setValue(
            "customer_specification",
            customerSpecificationExtractedOption
          );
          if (res?.data?.specific_products?.length) {
            const formattedProducts = convertPairFromProducts(
              res?.data?.specific_products
            );
            setValue("specific_products", formattedProducts);
          }
          if (res?.data?.minimum_purchase_value) {
            setValue(
              "minimum_purchase_value",
              +res?.data?.minimum_purchase_value
            );
          }
        })
        .catch((err) => {
          console.log(err);
          toastMessage(err?.response?.data?.name?.[0] || INVALID_ID);
          navigate("/discounts");
        })
        .finally(() => {
          toggleLoader("pageLoader");
        });
    }
  }, []);

  const onSubmit = (values, event) => {
    const buttonType = event.nativeEvent.submitter.name;
    setBtnLoaders({ ...btnLoaders, [buttonType]: !btnLoaders[buttonType] });
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
      "maximum_discount_usage",
      "customer_specification",
    ];
    let payload = {
      coupon_type: "amount_off_product",
      applies_to: convertSelectOptionToValue(values?.applies_to), //for converting {label:"vssd",value:"sdf"} into sdf
      discount_types: convertSelectOptionToValue(values?.discount_types),
    };
    fields.forEach((key) => {
      if (values?.[key]) {
        if (key === "customer_specification") {
          payload[key] = values?.[key]?.value;
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
    if (values?.specific_products?.length) {
      payload = {
        ...payload,
        // product: values?.products
        //   ?.map((item) => item?.value)
        //   .filter((value) => value !== undefined),
        specific_products: convertProductsIntoPairs(values?.specific_products),
      };
    }
    makeApiRequest({
      endPoint: DISCOUNT_ENDPOINT,
      method: isEdit ? METHODS?.put : METHODS.post,
      payload: payload,
      update_id: editId,
    })
      .then((res) => {
        toastMessage(
          `Discount  ${isEdit ? "Updated" : "Created"} successfully`,
          successType
        );
        navigate("/discounts");
      })
      .catch((err) => {
        console.log(err);
        const fieldError =
          err?.response?.data?.code?.[0] || err?.response?.data?.name?.[0];
        toastMessage(fieldError || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setBtnLoaders({ ...btnLoaders, [buttonType]: false });
      });
  };
  return (
    <div>
      {pageLoader ? (
        <PageLoader />
      ) : (
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
      )}
    </div>
  );
};

export default AmountOffProduct;
