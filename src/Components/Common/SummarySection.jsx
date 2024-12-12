import React from "react";
import { copyToClipboardIcon, dateIcon } from "../../assets/Icons/Svg";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { convertArrayToString, formatTime, showCombination } from "../../utils/helpers";


const SummarySection = ({ formConfig }) => {
  const { handleCopyToClipboard, isCopied } = useCopyToClipboard();
  const { watch } = formConfig;
  const {
    code,
    discount_types,
    discount_value,
    combination,
    customer_specification,
    maximum_discount_usage,
    maximum_usage_value,
    start_date,
    end_date,
    minimum_quantity_value,
    end_time,
    start_time,
    customer_eligibility,
    minimum_purchase_requirement,
    minimum_purchase_value,
  } = watch();
  console.log(end_date, "enddate");
  console.log(start_date, "startdate");
  const SPECIFIC_CUSTOMER_TO_VALUE = {
    havent_purchased: "- For Customers who have not purchased",
    recent_purchased: "- For Customers who have purchased recently",
    purchased_once: "- For Customers who have purchased at least once ",
    purchased_more_than_once:
      "- For Customers who have purchased more than once",
  };

  
  const showCustomerEligibility = () => {
    if (customer_eligibility === "all_customer") {
      return "- For All customers";
    } else if (
      customer_eligibility === "specific_customer" &&
      customer_specification
    ) {
      return SPECIFIC_CUSTOMER_TO_VALUE[customer_specification?.value];
    }
  };
  console.log(customer_eligibility, "customer_eligibility");
  const showDiscountUsage = () => {
    if (maximum_discount_usage === "per_customer") {
      return "-Limited to one use per user";
    } else if (
      maximum_discount_usage === "limit_discount_usage_time" &&
      maximum_usage_value
    ) {
      return `-This discount can be used a maximum of ${maximum_usage_value} times in total`;
    }
  };
  console.log(maximum_discount_usage, "maximum_discount_usage");

  return (
    <div>
      {" "}
      <div className="bg-white p-5 rounded-lg">
        <div className="border-b mb-6 font-semibold	">Summary</div>
        {code && (
          <div className="mb-6 font-semibold flex items-center space-x-4">
            <div className="text">Discount Code : </div>
            <div className="text">{code}</div>
            <div className="icon" onClick={() => handleCopyToClipboard(code)}>
              {isCopied ? <CheckedIcon /> : copyToClipboardIcon}
            </div>
          </div>
        )}
        {discount_types?.label ? (
          <div className="mb-4">
            <div className="mb-2">Type and method</div>
            <div className="text-nowrap text-[#969696]">
              -Type : {discount_types?.label}
            </div>
            {discount_value ? (
              <div className="text-nowrap text-[#969696]">
                -Value : {discount_value}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className="mb-4">
          <div className="mb-2">Details</div>
          {customer_eligibility && (
            <div className="text-nowrap text-[#969696]">
              {showCustomerEligibility()}
            </div>
          )}
          <div className="text-nowrap text-[#969696]">- For Online Store</div>
          <div className="text-nowrap text-[#969696]">
            {showDiscountUsage()}
          </div>
          <div className="text-nowrap text-[#969696]">
            {combination?.length
              ? `- Can Combine with ${showCombination(combination)}`
              : "- Cant Combine with other"}
          </div>
          <div className="text-nowrap text-[#969696]">- Discounts</div>

          <div className="text-nowrap text-[#969696]">- Active today</div>
          {minimum_purchase_requirement && (
            <>
              {minimum_purchase_requirement === "no_requirement" && (
                <div>
                  - This product has no minimum purchase or quantity
                  requirements
                </div>
              )}
              {minimum_purchase_requirement === "minimum_purchase" &&
                minimum_purchase_value && (
                  <div className="text-nowrap text-[#969696]">
                    {`- This product Requires a minimum purchase of $ ${minimum_purchase_value}`}
                  </div>
                )}
              {minimum_purchase_requirement === "minimum_items" &&
                minimum_quantity_value && (
                  <div className="text-nowrap text-[#969696]">
                    {`- This product Requires a minimum of ${minimum_quantity_value} items to be purchased`}
                  </div>
                )}
            </>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-2">Performance</div>
          <div className="text-nowrap text-[#969696] flex flex-col gap-2">
            {/* - Discount is not active yet */}
            {start_date && <div>- Start Date : {start_date}</div>}{" "}
            {end_date && <div>- End Date : {end_date}</div>}
            {start_time && <div>- Start Time : {formatTime(start_time)}</div>}
            {end_time && <div>- End Time : {formatTime(end_time)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
