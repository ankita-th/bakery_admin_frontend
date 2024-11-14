import React from "react";

const ErrorMessage = ({ fieldName, errors, customError = "" }) => {
  return (
    <>
      {customError ? (
        <p className="text-red-600">{customError}</p>
      ) : (
        errors?.[fieldName] && (
          <p className="text-red-600">{errors?.[fieldName].message}</p>
        )
      )}
    </>
  );
};

export default ErrorMessage;
