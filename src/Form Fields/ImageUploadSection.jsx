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

  return (
    <div>
      {label}
      <label htmlFor={inputId} className="image-upload-icon">
        {!file?.preview && imageUploadIcon}
      </label>
      <input
        onChange={(e) => {
          handleImageUpload(e);
        }}
        type="file"
        id={inputId}
        className="hidden"
        accept={accept}
      />

      {file?.preview && (
        <div className="image-preview-section">
          <img className="image-preview" src={file.preview} />
          <div
            className="remove-image"
            onClick={() => {
              setFile({ preview: null, error: "", file: null });
            }}
          >
            {closeIcon}
          </div>
        </div>
      )}
      <ErrorMessage customError={file?.error} />
    </div>
  );
};

export default ImageUploadSection;
