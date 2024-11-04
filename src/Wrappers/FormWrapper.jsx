import React from "react";
import { useForm } from "react-hook-form";
import CommonButton from "../Components/Common/CommonButton";

const FormWrapper = ({
  onSubmit,
  submitButtonText = "Submit",
  children,
  formConfig,
  className = "",
  isCustomButtons = false, // for this case button will also be passed as children
}) => {
  const { handleSubmit } = formConfig;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* form fields will come as children */}
        {children}
        {!isCustomButtons && (
          <CommonButton
            type="submit"
            text={submitButtonText}
            className={className}
          />
        )}
      </form>
    </div>
  );
};

export default FormWrapper;
