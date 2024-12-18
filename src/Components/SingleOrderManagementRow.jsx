import React from "react";
import CommonButton from "./Common/CommonButton";
import { editIcon, trashIcon } from "../assets/Icons/Svg";
import Checkbox from "./Common/Checkbox";

const SingleOrderManagementRow = ({ item, handleActions, index, currentPage }) => {
  // update required : keys for title, method and status are required
  const { id, combination, coupon_type } = item;
  return (
    <tr className="bg-white">
        <td className="p-3">
            <div className="font-semibold text-[16px]">{item.id}</div>
            <div className="text-[#808080] text-[12px]">{item.dateTime}</div>
        </td>
        <td className="p-3">
            <div>{item.name}</div>
            <div>{`${item.payment} (${item.paymentStatus})`}</div>
        </td>
        <td className="p-3">
            <div>{item.quantity}</div>
        </td>
        <td className="p-3">
        <div>● {item.status}</div>
        </td>
        <td className="p-3">
        <div className="flex space-x-2">
        <button className="!bg-[#FF6D2F] text-white !px-6 py-2 rounded">
          Accept
        </button>
        <button className="bg-red-100 text-red-500 !px-4 py-2 rounded hover:bg-red-200 transition">
          Decline
        </button>
      </div>
        </td>
    </tr>
   
  );
};

export default SingleOrderManagementRow;
