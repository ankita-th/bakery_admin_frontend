import React from "react";
import { closeIcon, imageUploadIcon } from "../assets/Icons/Svg";
import ErrorMessage from "../Components/Common/ErrorMessage";
import { isValidType } from "../utils/helpers";
import { Controller } from "react-hook-form";

const MultipleImageUploadField = ({
  label,
  files,
  setFiles,
  allowedTypes,
  imageError,
  setImageError,
  uploadButton,
}) => {
  const inputId = `image-upload-${label}`;

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);

    newFiles.forEach((file, index) => {
      if (isValidType(file, allowedTypes)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const itemToAppend = {
            preview: event.target.result,
            file: file,
          };
          setFiles([...files, itemToAppend]);
          setImageError("");
        };
        reader.readAsDataURL(file);
      } else {
        const itemToAppend = {
          file: null,
          preview: "",
        };
        setImageError("Please upload a valid image");
        setFiles([...files, itemToAppend]);
      }
    });

    e.target.value = ""; // Clear input to allow re-uploading same files
  };

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((curElem, idx) => idx !== index));
  };
  console.log(imageError, "imageError");

  return (
    <div>
      <div className="label">{label}</div>
      <label htmlFor={inputId} className={uploadButton.class}>
        {uploadButton?.text}
      </label>
      <input
        onChange={(e) => handleImageUpload(e)}
        type="file"
        id={inputId}
        className="hidden"
        accept="image/*"
        multiple={true}
      />

      <div className="image-preview-section">
        {files.map(
          ({ preview, file }, index) =>
            file && (
              <div key={index} className="image-preview-wrapper">
                <img
                  className="image-preview"
                  src={preview}
                  //   alt={`preview-${index}`}
                />
                <div
                  className="remove-image"
                  onClick={() => removeImage(index)}
                >
                  {closeIcon}
                </div>
              </div>
            )
        )}
      </div>
      {/* need to update this logic */}
      <ErrorMessage customError={imageError} />
    </div>
  );
};

export default MultipleImageUploadField;
