import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ErrorMessage from "../Components/Common/ErrorMessage";

const defaultToolBar = [
  [{ header: [1, 2, 3, false] }], // Dropdown for H1, H2, and Normal text
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  // [{ color: [] }, { background: [] }], // Add color and background color
  // [{ align: [] }],
  ["link"],
  //   ["link", "image", "code-block"],
  // ["clean"], // remove formatting button
];

const CommonTextEditor = ({
  placeholder = "",
  className = "",
  toolbarOptions = defaultToolBar,
  formConfig,
  rules,
  fieldName,
  requiredMessage,
  label,
}) => {
  const {
    control,
    formState: { errors },
  } = formConfig;
  return (
    <div>
      {label}
      <Controller
        control={control}
        name={fieldName}
        rules={{
          ...rules,
          validate: (value) => {
            const isEmpty =
              value === "" || value === "<p><br></p>" || value === undefined;
            return isEmpty && requiredMessage ? requiredMessage : true;
          },
        }}
        render={({ field }) => (
          <>
            <ReactQuill
              {...field}
              placeholder={placeholder}
              className={className}
              theme="snow"
              modules={{ toolbar: toolbarOptions }}
            />
          </>
        )}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
};

export default CommonTextEditor;
