import React from "react";
import { closeIcon, imageUploadIcon } from "../assets/Icons/Svg";
import ErrorMessage from "../Components/Common/ErrorMessage";
import { isValidType } from "../utils/helpers";

const ImageUploadSection = ({
  label,
  setFile,
  file,
  allowedTypes,
  accept = "image/*",
  // rules
}) => {
  const inputId = `image-upload-${label}`;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (isValidType(file, allowedTypes)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFile({ ...file, file: file, preview: e.target.result, error: "" });
        };
        reader.readAsDataURL(file);
      } else {
        setFile({
          ...file,
          preview: null,
          error: "Please upload a valid image", //update required:Need to update the error message
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
