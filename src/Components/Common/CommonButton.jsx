import React from "react";
import { BUTTON_LOADER } from "../../assets/Icons/Svg";

const CommonButton = ({
  onClick,
  type = "submit",
  text,
  disabled,
  icon,
  className = "",
  loader = false,
  name = "",
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      name={name}
    >
      {icon}
      {text}
      {loader && BUTTON_LOADER}
    </button>
  );
};

export default CommonButton;
