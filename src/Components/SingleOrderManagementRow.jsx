import React from "react";
import CommonButton from "./Common/CommonButton";
import { editIcon, trashIcon } from "../assets/Icons/Svg";
import Checkbox from "./Common/Checkbox";

const SingleOrderManagementRow = ({ item, handleActions, index, currentPage }) => {
  // update required : keys for title, method and status are required
  const { id, combination, coupon_type } = item;
  return (
    <tr className="text-center bg-white">
        <td>
            <div>{item.id}</div>
            <div>{item.dateTime}</div>
        </td>
        <td>
            <div>{item.name}</div>
            <div>{`${item.payment} (${item.paymentStatus})`}</div>
        </td>
        <td>
            <div>{item.quantity}</div>
        </td>
        <td>
        <div>● {item.status}</div>
        </td>
        <td>
        <div className="flex space-x-2">
        <button className="bg-[#FF6D2F] text-white px-4 py-2 rounded">
          Accept
        </button>
        <button className="bg-red-100 text-red-500 px-4 py-2 rounded hover:bg-red-200 transition">
          Decline
        </button>
      </div>
        </td>
    </tr>
   
  );
};

export default SingleOrderManagementRow;
