import React from "react";

const CommonButton = ({
  onClick,
  type = "submit",
  text,
  disabled,
  icon,
  className = "",
  loader = false,
}) => {
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {icon}
      {text}
      {/* add loader here */}
      {loader && "...loading"}
    </button>
  );
};

export default CommonButton;
