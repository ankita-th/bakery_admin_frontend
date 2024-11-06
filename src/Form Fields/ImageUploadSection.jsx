import React from "react";
import { closeIcon, imageUploadIcon } from "../assets/Icons/Svg";
import ErrorMessage from "../Components/Common/ErrorMessage";
import { isValidType } from "../utils/helpers";

const ImageUploadSection = ({
  label,
  fieldName,
  formConfig,
  imagePreview,
  setImagePreview,
  allowedTypes,
}) => {
  const {
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = formConfig;
  const inputId = `image-upload-${label}`;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (isValidType(file, allowedTypes)) {
        // logic to convert image file into url
        clearErrors(fieldName);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
        clearErrors(fieldName);
      } else {
        setError(fieldName, {
          type: "manual",
          message: "Please upload a valid image file",
        });
        setImagePreview(null);
      }
    }
    e.target.value = "";
  };

  return (
    <div>
      {label}
      <label htmlFor={inputId} className="image-upload-icon">
        {!imagePreview && imageUploadIcon}
      </label>
      <input
        {...register(fieldName, {
          // may be need to remove this validation in future
          // required: imagePreview ? false : "Category Image is required",
          onChange: (e) => {
            handleImageUpload(e);
          },
        })}
        type="file"
        id={inputId}
        className="hidden"
        accept="image/*"
      />
      {imagePreview && (
        <div className="image-preview-section">
          <img className="image-preview" src={imagePreview} />
          <div
            className="remove-image"
            onClick={() => {
              setImagePreview(null);
              // setError(fieldName, {
              //   type: "manual",
              //   message: "Category Image us required",
              // });
            }}
          >
            {closeIcon}
          </div>
        </div>
      )}
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};

export default ImageUploadSection;
