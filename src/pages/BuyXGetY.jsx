import React from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../Wrappers/FormWrapper";
import GenrateRandomCode from "../Components/Common/GenrateRandomCode";
import CommonTextField from "../Form Fields/CommonTextField";
import { createRequiredValidation } from "../utils/helpers";
import CommonButton from "../Components/Common/CommonButton";
import DiscountSideSection from "../Components/DiscountSideSection";
import DiscountedValue from "../Components/DiscountedValue";
import CustomerEligibility from "../Components/Common/CustomerEligibility";
import Combinations from "../Components/Common/Combinations";
import ActiveDates from "../Components/Common/ActiveDates";
import DiscountUses from "../Components/Common/DiscountUses";
import DiscountCodeSection from "../Components/Common/DiscountCodeSection";
import MinimumPurchaseRequirement from "../Components/Common/MinimumPurchaseRequirement";

const BuyXGetY = () => {
  const formConfig = useForm();
  const { watch, setValue } = formConfig;
  const onSubmit = (values) => {
    const coupon_type = "buy_x_get_y";
    const payload = {
      coupon_type: coupon_type,
    };
    console.log(values, "these are values");
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
            <MinimumPurchaseRequirement formConfig={formConfig} />
            <CustomerEligibility formConfig={formConfig} />
            <DiscountUses formConfig={formConfig} />
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

export default BuyXGetY;
