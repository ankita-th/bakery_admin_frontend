import React, { useState } from "react";
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

const AmountOffOrder = () => {
  const [btnLoaders, setBtnLoaders] = useState({
    draft: false,
    saveDiscount: false,
  });
  const formConfig = useForm();
  const { watch } = formConfig;
  const onSubmit = (values) => {
    console.log(values);
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
          <DiscountSideSection>
            {/* need to add sidebar section */}
          </DiscountSideSection>
        </div>
      </FormWrapper>
    </div>
  );
};

export default AmountOffOrder;
