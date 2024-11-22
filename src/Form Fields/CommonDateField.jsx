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
  icon = null,
  disabled = false,
  type = "date",
}) => {
  const {
    register,
    formState: { errors },
  } = formConfig;

  return (
    <div>
      <div className="date-input">
        <div className="label">{label}</div>
        <input
          type={type}
          {...register(fieldName, rules)}
          min={minDate}
          max={maxDate}
          className={className}
          disabled={disabled}
        />
        {icon}
      </div>
      <ErrorMessage fieldName={fieldName} errors={errors} />
    </div>
  );
};

export default CommonDateField;
