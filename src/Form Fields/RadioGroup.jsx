import React, { Fragment } from "react";
import ErrorMessage from "../Components/Common/ErrorMessage";
// options must be an array of object and the object must contain label and value keys
const RadioGroup = ({ formConfig, fieldName, options, label, rules }) => {
  const {
    register,
    formState: { errors },
  } = formConfig;
  return (
    <div>
      <div className="label">{label}</div>
      {options?.map(({ value, label: optionLabel }, idx) => (
        <Fragment key={idx}>
          <input {...register(fieldName, rules)} type="radio" value={value} />
          <div className="option-label">{optionLabel}</div>
        </Fragment>
      ))}
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};

export default RadioGroup;
