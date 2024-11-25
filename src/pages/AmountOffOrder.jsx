import React from "react";
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

const AmountOffOrder = () => {
  const formConfig = useForm();
  const onSubmit = (values) => {
    console.log(values);
  };
  console.log("inside");
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
            {/* discount type and value */}
            <DiscountTypeAndValue formConfig={formConfig} />
            {/* discount uses */}
            <DiscountUses formConfig={formConfig} />
            {/* discount value section */}
            <DiscountedValue formConfig={formConfig} />
            {/* customer eligibility */}

            <CustomerEligibility formConfig={formConfig} />
            {/* combinations */}
            <Combinations formConfig={formConfig} />
            {/* active dates */}
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
