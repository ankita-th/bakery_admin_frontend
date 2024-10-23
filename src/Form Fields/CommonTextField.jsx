import React from "react";
import ErrorMessage from "../Components/Common/ErrorMessage";

const DEFAULT_CLASS =
  "px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all";

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
  isNumberOnly = false,
  maxlength = null,
  rows = null,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = formConfig;
  return (
    <div>
      <div className="label">{label}</div>
      {isNumberOnly ? (
        <input
          {...register(fieldName, {
            ...rules,
            onChange: (e) => {
              const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
              setValue(fieldName, numbersOnly);
            },
          })}
          type={type}
          placeholder={placeholder}
          className={className}
          maxlength={maxlength}
        />
      ) : type === "textarea" ? (
        <textarea
          {...register(fieldName, rules)}
          type={type}
          placeholder={placeholder}
          className={className}
          maxlength={maxlength}
          rows={rows}
        />
      ) : (
        <input
          {...register(fieldName, rules)}
          type={type}
          placeholder={placeholder}
          className={className}
          maxlength={maxlength}
        />
      )}

      <div className="icon" onClick={onIconClick}>
        {icon}
      </div>
      <ErrorMessage fieldName={fieldName} errors={errors} />
    </div>
  );
};

export default CommonTextField;
