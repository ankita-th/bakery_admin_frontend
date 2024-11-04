import React from "react";
import { DEFAULT_CLASS } from "../constant";
import ErrorMessage from "../Components/Common/ErrorMessage";

const CommonDateField = ({
  formConfig,
  fieldName,
  rules,
  minDate = null,
  maxDate = null,
  className = DEFAULT_CLASS,
  label,
}) => {
  const {
    register,
    formState: { errors },
  } = formConfig;

  return (
    <div>
      <div className="label">{label}</div>
      <input
        type="date"
        {...register(fieldName, rules)}
        min={minDate}
        max={maxDate}
        className={className}
      />
      <ErrorMessage fieldName={fieldName} errors={errors} />
    </div>
  );
};

export default CommonDateField;
