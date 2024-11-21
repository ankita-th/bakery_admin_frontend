import React from "react";
import CommonButton from "./Common/CommonButton";
import { editIcon, trashIcon } from "../assets/Icons/Svg";
import Checkbox from "./Common/Checkbox";

const SingleDiscountRow = ({ item, handleActions, index, currentPage }) => {
  // update required : keys for title, method and status are required
  const { id, combination, coupon_type } = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">
        <Checkbox />
      </td>

      <td className="py-2 px-4 border">Title</td>
      <td className="py-2 px-4 border">Method</td>
      <td className="py-2 px-4 border">{coupon_type}</td>
      {/* update required:this field could be an array so populate accordingly */}
      <td className="py-2 px-4 border">{combination}</td>
      <td className="py-2 px-4 border space-x-2">
        <button
          onClick={() => {
            // need to confirm about id or task id
            handleActions({ action: "edit", editItem: item });
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          {editIcon}
        </button>
        <button
          onClick={() => {
            handleActions({ action: "delete", delete_id: id });
          }}
          className="text-red-500 hover:text-red-700"
        >
          {trashIcon}
        </button>
      </td>
    </tr>
  );
};

export default SingleDiscountRow;
