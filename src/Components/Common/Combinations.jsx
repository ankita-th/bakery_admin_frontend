import React from "react";
import CheckboxGroup from "../../Form Fields/CheckboxGroup";
import { COMBINATION_OPTIONS } from "../../constant";
import { createRequiredValidation } from "../../utils/helpers";

const Combinations = ({ formConfig }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="mb-4">
        <div className="text-[#3E3232] mb-1">Combinations</div>
        <CheckboxGroup
          formConfig={formConfig}
          label="This product discount can be combined with:"
          options={COMBINATION_OPTIONS}
          fieldName="combination"
          rules={createRequiredValidation("Combination")}
          className="flex gap-10"
        />
        <div className="text-[#969696]">
          This product discount can be combined with:
        </div>
      </div>
    </div>
  );
};

export default Combinations;
