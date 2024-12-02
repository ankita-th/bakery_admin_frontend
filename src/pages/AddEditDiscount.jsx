import React from "react";
import { useLocation } from "react-router-dom";
import AmountOffProduct from "../Components/AmountOffProduct";
import { useForm } from "react-hook-form";
import BuyXGetY from "./BuyXGetY";
import FreeShipping from "./FreeShipping";
import AmountOffOrder from "./AmountOffOrder";

const AddEditDiscount = () => {
  const location = useLocation();
  const type = location?.state?.type || "default";
  const onSubmit = (values) => {
  };
  //   this will render component according to the type
  const renderComponent = () => {
    switch (type) {
      case "amount_off_product":
        return <AmountOffProduct />;
      case "amount_off_order":
       return <AmountOffOrder />;
      case "buy_x_get_y":
        return <BuyXGetY />;
      case "free_shipping":
        return <FreeShipping />;
      default:
        return <AmountOffProduct />;
    }
  };
  return <div>{renderComponent()}</div>;
};

export default AddEditDiscount;
