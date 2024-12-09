import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import DiscountSideSection from "../Components/DiscountSideSection";
import CustomerEligibility from "../Components/Common/CustomerEligibility";
import Combinations from "../Components/Common/Combinations";
import ActiveDates from "../Components/Common/ActiveDates";
import DiscountUses from "../Components/Common/DiscountUses";
import DiscountCodeSection from "../Components/Common/DiscountCodeSection";
import MinimumPurchaseRequirement from "../Components/Common/MinimumPurchaseRequirement";
import DiscountedValue from "../Components/DiscountedValue";
import SummarySection from "../Components/Common/SummarySection";
import CustomerBuys from "../Components/CustomerBuys";
import CustomerGets from "../Components/CustomerGets";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { DISCOUNT_ENDPOINT } from "../api/endpoints";
import { successType, toastMessage } from "../utils/toastMessage";
import { CUSTOMER_SPECIFIC_OPTIONS, DEFAULT_ERROR_MESSAGE, INVALID_ID, ITEMS_FROM_OPTIONS } from "../constant";
import { useNavigate } from "react-router-dom";
import { extractOption, prefillFormValues } from "../utils/helpers";

const BuyXGetY = ({location}) => {
  const [btnLoaders, setBtnLoaders] = useState({
    draft: false,
    saveDiscount: false,
  });
  const navigate = useNavigate();

//   const dummy = {
//     "code": "WPE5A",
//     "customer_buy_types": "minimum_purchase_amount",
//     "items_from": {
//         "label": "Specify product",
//         "value": "specific_product"
//     },
//     "discount_types": "amount_off_each",
//     "customer_eligibility": "specific_customer",
//     "maximum_discount_usage": "limit_number_of_times",
//     "combination": [
//         "product_discounts",
//         "other_discounts"
//     ],
//     "start_date": "2024-12-18",
//     "start_time": "20:15",
//     "end_date": "2024-12-26",
//     "end_time": "22:17",
//     "buy_products_quantity": "",
//     "discount_value": "78",
//     "": "",
//     "buy_products_amount": "67",
//     "customer_gets_amount": "98",
//     "buy_products": [
//         {
//             "label": "BIscuit",
//             "value": 227
//         }
//     ],
//     "customer_specification": {
//         "label": "Abandoned checkouts in the last 30 days",
//         "value": "abandoned_checkouts"
//     },
//     "maximum_usage_value": "654",
//     "coupon_type": "buy_x_get_y"
// }
  
  const formConfig = useForm();
  const isEdit = location?.state?.isEdit;
  const editId = location?.state?.editId;

  const { watch, setValue } = formConfig;

  useEffect(() => {
    
    // const dummyData={
    //   "code": "BUYGET2024",
    //   "customer_buy_types":  "minimum_purchase_amount",
    //   "items_from": "all_product",
    //   "buy_products_quantity": 3,
    //   "buy_products_amount": 150,
    //   "buy_products": [12, 57, 23],
    //   "customer_gets_quantity": 2,
    //   "customer_gets_amount": 50,
    //   "discount_types": "free",
    //   "discount_value": 30,
    //   "customer_eligibility": "specific_customer",
    //   "customer_specification": "purchased_more_than_once",
    //   "maximum_discount_usage": "per_customer",
    //   "maximum_usage_value": 5,
    //   "combination": ["product_discounts", "order_discounts", "shipping_discounts"],
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
            "buy_products",
            "buy_products_amount",
            "buy_products_quantity",
            "code",
            "combination",
            "customer_buy_types",
            "coupon_type",
            "customer_buy_types",
            "customer_eligibility",
            "customer_gets_amount",
            "customer_specification",
            "discount_types",
            "discount_value",
            "end_date",
            "end_time",
            "items_from",
            "maximum_discount_usage",
            "maximum_usage_value",
            "start_date",
            "start_time",
            
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
          const itemsFromExtractedOption = extractOption(ITEMS_FROM_OPTIONS,res?.data?.items_from,"value")
          setValue("items_from", itemsFromExtractedOption);
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
    //  dummyData?.customer_specification,
    //   "value"
    // );
    // setValue("customer_specification", extractedOption);
    // const itemsFromExtractedOption = extractOption(ITEMS_FROM_OPTIONS,dummyData?.items_from,"value")
    // setValue("items_from", itemsFromExtractedOption);
  }, []);


  const onSubmit = (values,event) => {
    const buttonType = event.nativeEvent.submitter.name;
    const payload = {
      ...values,
      coupon_type: "buy_x_get_y",
      // customer_specification: values?.customer_specification?.value,
      // minimum_purchase_value: +values?.minimum_purchase_value,
    };
    console.log(payload, "this is payload");
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
            {/* add components for customer buys and customer gets here */}
            <CustomerBuys formConfig={formConfig} />
            <CustomerGets formConfig={formConfig}/>
            <DiscountedValue formConfig={formConfig} />
            <CustomerEligibility formConfig={formConfig} />
            <DiscountUses formConfig={formConfig} />
            <Combinations formConfig={formConfig} />
            {/* <MinimumPurchaseRequirement formConfig={formConfig} /> */}
            <ActiveDates formConfig={formConfig} />
          </div>
          {/* sidebar */}
          <DiscountSideSection btnLoaders={btnLoaders}>
            <SummarySection />
            {/* need to add sidebar section */}
          </DiscountSideSection>
        </div>
      </FormWrapper>
    </div>
  );
};

export default BuyXGetY;
