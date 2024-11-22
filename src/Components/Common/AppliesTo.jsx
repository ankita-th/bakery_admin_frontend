import React, { useState } from "react";
import CommonSelect from "../../Form Fields/CommonSelect";
import { APPLIES_TO_OPTIONS } from "../../constant";
import { makeApiRequest, METHODS } from "../../api/apiFunctions";
import { PRODUCT_ENDPOINT } from "../../api/endpoints";

const AppliesTo = ({ formConfig }) => {
  const { watch } = formConfig;
  const [productName, setProductName] = useState("");
  const [loader, setLoader] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const handleSearchProduct = () => {
    setLoader((prev) => true);
    const apiParams = {
      name: productName,
    };
    makeApiRequest({
      endPoint: PRODUCT_ENDPOINT    ,
      method: METHODS.get,
      params: apiParams,
    })
      .then((res) => {
        setProductOptions(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setLoader((prev) => false));
  };
  return (
    <div>
      {" "}
      <div>
        <CommonSelect
          label="Applies to"
          fieldName="applies_to"
          options={APPLIES_TO_OPTIONS}
          selectType="react-select"
          formConfig={formConfig}
          placeholder="Select"
          className="px-4 py-2 mb-4 w-full rounded-lg bg-[#F5F5F5]"
        />
        {watch("applies_to")?.value === "specific_products" && (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search Products"
              className="px-4 py-2 w-4/5 rounded-lg bg-[#F5F5F5]"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
            <button
              type="button"
              className="w-1/5 bg-[#FF6D2F] text-[#FFFFFF] rounded-lg"
              onClick={handleSearchProduct}
            >
              Search Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliesTo;
