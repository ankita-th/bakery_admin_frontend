import React from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import DiscountCodeSection from "../Components/Common/DiscountCodeSection";
import MinimumPurchaseRequirement from "../Components/Common/MinimumPurchaseRequirement";
import CustomerEligibility from "../Components/Common/CustomerEligibility";
import DiscountUses from "../Components/Common/DiscountUses";
import Combinations from "../Components/Common/Combinations";
import ActiveDates from "../Components/Common/ActiveDates";

const FreeShipping = () => {
  const formConfig = useForm();
  const onSubmit = (values) => {
    console.log(values);
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

            <MinimumPurchaseRequirement formConfig={formConfig} />
            <CustomerEligibility formConfig={formConfig} />
            <DiscountUses formConfig={formConfig} />
            <Combinations formConfig={formConfig} isShipping={true} />
            <ActiveDates formConfig={formConfig} />
          </div>
        </div>
      </FormWrapper>
    </div>
  );
};

export default FreeShipping;
