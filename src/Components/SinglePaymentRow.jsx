import React from "react";
import { paymentEyeIcon, printIcon } from "../assets/Icons/Svg";

const SinglePaymentRow = ({ item, handleActions }) => {
  const {
    id,
    customer_name,
    date,
    order_id,
    payment_method,
    amount,
    status,
    transaction_id,
  } = item;
  return (
      <tr className="text-center">
        <td className="py-2 px-4 border">{id}</td>
        <td className="py-2 px-4 border">{customer_name}</td>
        <td className="py-2 px-4 border">{date}</td>
        <td className="py-2 px-4 border">{order_id}</td>
        <td className="py-2 px-4 border">{payment_method}</td>
        <td className="py-2 px-4 border">{amount}</td>
        <td className="py-2 px-4 border">{status}</td>
        <td className="py-2 px-4 border">{transaction_id}</td>

        <td className="py-2 px-4 space-x-2">
          <button
            onClick={() => {
              handleActions({ action: "print", id: id });
            }}  
            className="text-red-500 hover:text-red-700"
          >
            {printIcon}
          </button>
          <button
            onClick={() => {
              // Update required : decide whether to pass id or whole element
              handleActions({ action: "view", id: id });
            }}
            className="text-red-500 hover:text-red-700"
          >
            {paymentEyeIcon}
          </button>
        </td>
      </tr>

  );
};

export default SinglePaymentRow;
