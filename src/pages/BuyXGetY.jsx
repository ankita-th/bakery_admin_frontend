import React, { useState } from "react";
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

const BuyXGetY = () => {
  const [btnLoaders, setBtnLoaders] = useState({
    draft: false,
    saveDiscount: false,
  });
  const formConfig = useForm();
  const { watch, setValue } = formConfig;
  const onSubmit = (values) => {
    const coupon_type = "buy_x_get_y";
    const payload = {
      coupon_type: coupon_type,
    };
    console.log(payload, "this is payload");
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
