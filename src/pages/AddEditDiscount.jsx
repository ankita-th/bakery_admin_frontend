import React from "react";
import { useLocation } from "react-router-dom";
import AmountOffProduct from "../Components/AmountOffProduct";
import { useForm } from "react-hook-form";

const AddEditDiscount = () => {
  const location = useLocation();
  const formConfig = useForm();
  const type = location?.state?.type || "default";
  console.log(type, "this is type");
  const onSubmit = (values) => {
    console.log(values, "these are values");
  };
  //   this will render component according to the type
  const renderComponent = () => {
    switch (type) {
      case "amount_off_order":
        return <AmountOffProduct />;
      default:
        return <AmountOffProduct formConfig={formConfig} onSubmit={onSubmit} />;
    }
  };
  return <div>{renderComponent()}</div>;
};

export default AddEditDiscount;
