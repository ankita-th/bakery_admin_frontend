import React from "react";
import { copyToClipboardIcon } from "../../assets/Icons/Svg";

const SummarySection = ({ formConfig }) => {
  return (
    <div>
      {" "}
      <div className="bg-white p-5 rounded-lg">
        <div className="border-b mb-6 font-semibold	">Summary</div>
        <div className="mb-6 font-semibold flex items-center space-x-4">
          <div className="text">DiscountCodee</div>
          <div className="icon">{copyToClipboardIcon}</div>
        </div>
        <div className="mb-4">
          <div className="mb-2">Type and method</div>
          <div className="text-nowrap text-[#969696]">
            - Amount off products Code
          </div>
          <div className="text-nowrap text-[#969696]">- Code</div>
        </div>
        <div className="mb-4">
          <div className="mb-2">Details</div>
          <div className="text-nowrap text-[#969696]">- For Online Store</div>
          <div className="text-nowrap text-[#969696]">- No Usage Limits</div>
          <div className="text-nowrap text-[#969696]">
            - Cant Combine with other
          </div>
          <div className="text-nowrap text-[#969696]">- Discounts</div>
          <div className="text-nowrap text-[#969696]">- Active today</div>
        </div>

        <div className="mb-4">
          <div className="mb-2">Performance</div>
          <div className="text-nowrap text-[#969696]">
            - Discount is not active yet
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
