import React from "react";
import { closeIcon, imageUploadIcon } from "../assets/Icons/Svg";
import ErrorMessage from "../Components/Common/ErrorMessage";
import { isValidType } from "../utils/helpers";
import { allowedImageTypes } from "../constant";

const ImageUploadSection = ({
  label,
  setFile,
  file,
  allowedTypes = allowedImageTypes,
  accept = "image/*",
  uniqueId,
  disabled = false,
  uploadInfo = { isOnUploadRequired: false }, // {isOnUploadRequired:true/false , onUpload:() => {}}
  // rules
}) => {
  const inputId = `image-upload-${uniqueId}`;
  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (isValidType(uploadedFile, allowedTypes)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFile({
            ...file,
            file: uploadedFile,
            preview: e.target.result,
            error: "",
          });
        };
        reader.readAsDataURL(uploadedFile);
        if (uploadInfo?.isOnUploadRequired) {
          onUpload(file);
        }
      } else {
        setFile({
          ...file,
          preview: null,
          error: "Please upload a valid image i.e .png and .jpg", //update required:Need to update the error message
          file: null,
        });
      }
    }
    e.target.value = "";
  };
  console.log(disabled, "disable");
  return (
    <div className="product-data-section p-3 bg-white">
      <div className="label mb-4">{label}</div>
      {/* {!disabled && (
        <>
          <label htmlFor={inputId} className="image-upload-icon cursor-pointer">
            {!file?.preview && imageUploadIcon}
          </label>
          <input
            onChange={(e) => {
              handleImageUpload(e);
            }}
            type="file"
            id={inputId}
            className="hidden"
            disabled={disabled}
            accept={accept} //"image/*"
          />
        </>
      )} */}

      {!disabled ? (
        <div className="upload_div border border-dashed border-[#c1c1c1] rounded-[7px] text-center min-h-[100px] flex items-center justify-center">
          <label htmlFor={inputId} className="image-upload-icon cursor-pointer">
            {!file?.preview && imageUploadIcon}
          </label>
        </div>
      ) : (
        ""
      )}
      <input
        onChange={(e) => {
          handleImageUpload(e);
        }}
        type="file"
        id={inputId}
        className="hidden"
        disabled={disabled}
        accept={accept} //"image/*"
      />

      {file?.preview && (
        <div className="image-preview-section w-full featured_img">
          <img className="image-preview" src={file.preview} />
          {!disabled ? (
            <div
              className="remove-image"
              onClick={() => {
                setFile({ preview: null, error: "", file: null });
              }}
            >
              {closeIcon}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      <ErrorMessage customError={file?.error} />
    </div>
  );
};

export default ImageUploadSection;
