import React from "react";
import { paymentEyeIcon, printIcon } from "../assets/Icons/Svg";
import { formatDate } from "../utils/helpers";
import { YYYY_MM_DD } from "../constant";

const SingleOrdersRow = ({ item, handleActions }) => {
  const { id, customer_name, date, items, quantity, reason_for_decline } = item;

  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">{id}</td>
      <td className="py-2 px-4 border">{customer_name}</td>
      <td className="py-2 px-4">{formatDate(date, YYYY_MM_DD)}</td>
      <td className="py-2 px-4 border">{items}</td>
      <td className="py-2 px-4 border">{quantity}</td>
      <td className="py-2 px-4 border">{reason_for_decline}</td>
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
            handleActions({ action: "view", id: id ,viewItem: item  });
          }}
          className="text-red-500 hover:text-red-700"
        >
          {paymentEyeIcon}
        </button>
      </td>
    </tr>
  );
};

export default SingleOrdersRow;