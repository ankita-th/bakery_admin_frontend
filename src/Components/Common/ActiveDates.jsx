import React, { useEffect, useState } from "react";
import CommonDateField from "../../Form Fields/CommonDateField";
import { createRequiredValidation } from "../../utils/helpers";
import { today } from "../../constant";

const ActiveDates = ({ formConfig }) => {
  const [showEndDate, setShowEndDate] = useState(false);
  const { watch, setValue } = formConfig;
  const { end_date, start_time, start_date } = watch();
  useEffect(() => {}, []);
  const toggleEndDate = () => {
    if (showEndDate) {
      setValue("end_date", "");
    }
    setShowEndDate((prev) => !prev);
  };
  console.log(end_date, "log end date");
  console.log(start_time, "log start time");
  console.log(start_date, "log start date");

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="mb-4">Active Dates</div>
      <div className="flex gap-4 mb-4">
        <CommonDateField
          label="Start Date *"
          className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
          minDate={today}
          fieldName="start_date"
          formConfig={formConfig}
        />
        <CommonDateField
          type="time"
          label="Start Time *"
          className="px-4 py-2 w-full rounded-lg bg-[#F5F5F5]"
          fieldName="start_time"
          formConfig={formConfig}
        />
      </div>
      <div
        className="text-[#FF6D2F] underline cursor-pointer"
        onClick={toggleEndDate}
      >
        {showEndDate ? "Remove End Date" : "Set End Date"}
      </div>

      {showEndDate && (
        <CommonDateField
          label="End Date *"
          formConfig={formConfig}
          fieldName="end_date"
          minDate={watch("start_date")}
          rules={{
            ...createRequiredValidation("End date"),
            validate: (value) =>
              value >= watch("start_date") ||
              "End date must be greater than or equal to the start date",
          }}
        />
      )}
    </div>
  );
};

export default ActiveDates;
