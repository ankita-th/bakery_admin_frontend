import React from "react";
import CommonButton from "./Common/CommonButton";
import { draftIcon, publishIcon } from "../assets/Icons/Svg";

const DiscountSideSection = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <CommonButton
          text="Draft"
          name="draft"
          className="px-4 py-2 bg-[#E4E4E4] rounded-lg orange_btn"
          type="submit"
          icon={draftIcon}
        />
        <CommonButton
          text="Save Discount"
          name="save"
          className="px-4 py-2 bg-[#E4E4E4] rounded-lg orange_btn"
          type="submit"
          icon={publishIcon}
        />
      </div>
      {/* for summary section */}
      {children}
    </div>
  );
};

export default DiscountSideSection;
