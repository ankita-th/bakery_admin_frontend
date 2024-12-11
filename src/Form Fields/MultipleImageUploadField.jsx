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
  accept = "image/*",
}) => {
  const inputId = `image-upload-${label}`;

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    // add maximum file limit here
    if (files.length + newFiles.length <= 5) {
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
    } else {
      setImageError("At most 5 images can be added");
    }

    e.target.value = ""; // Clear input to allow re-uploading same files
  };

  const removeImage = (index) => {
    if (files?.length === 5) {
      setImageError("");
    }
    setFiles((prev) => prev.filter((curElem, idx) => idx !== index));
  };
  console.log(imageError, "imageError");

  return (
    <div>
      <div className="label">{label}</div>
      <label htmlFor={inputId} className={uploadButton?.class}>
        {uploadButton?.text}
        {imageUploadIcon}
      </label>
      <input
        onChange={(e) => handleImageUpload(e)}
        type="file"
        id={inputId}
        className="hidden"
        accept={accept}
        multiple={true}
      />
      {files?.length ? (
        <div className="image-preview-section">
          {files?.map(
            ({ preview, file }, index) =>
              (file || preview) && (
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
      ) : (
        ""
      )}

      {/* need to update this logic */}
      <ErrorMessage customError={imageError} />
    </div>
  );
};

export default MultipleImageUploadField;
