import React from "react";
import ErrorMessage from "../Components/Common/ErrorMessage";
import { DEFAULT_CLASS } from "../constant";

const CommonTextField = ({
  rules,
  fieldName,
  formConfig,
  type = "text",
  placeholder,
  className = DEFAULT_CLASS,
  label,
  icon,
  onIconClick,
  maxlength = null,
  rows = null,
  customError = null,
  labelClassName = "",
  disabled = false,
  isNumberOnly = false,
  isDecimal = false,
  //Number only will used for phone number inputs only and will not include any decimal , 
  // for decimal values like currency etc. will use isDecimal
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = formConfig;
  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <div className="common-field relative">
        {isNumberOnly ? (
          <input
            {...register(fieldName, {
              ...rules,
              onChange: (e) => {
                const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
                const decimalOnly = e.target.value.replace(/[^0-9.]/g, "");
                setValue(fieldName, isDecimal ? decimalOnly : numbersOnly);
              },
            })}
            type={type}
            placeholder={placeholder}
            className={className}
            maxlength={maxlength}
            disabled={disabled}
          />
        ) : type === "textarea" ? (
          <textarea
            {...register(fieldName, rules)}
            type={type}
            placeholder={placeholder}
            className={className}
            maxlength={maxlength}
            rows={rows}
            disabled={disabled}
          />
        ) : (
          <input
            {...register(fieldName, rules)}
            type={type}
            placeholder={placeholder}
            className={className}
            maxlength={maxlength}
            disabled={disabled}
          />
        )}

        <div className="icon absolute right-5 top-[17px]" onClick={onIconClick}>
          {icon}
        </div>
      </div>

      {customError ? (
        <p className="text-red-600">{customError}</p>
      ) : (
        <ErrorMessage fieldName={fieldName} errors={errors} />
      )}
    </div>
  );
};

export default CommonTextField;
