import React from "react";
import { trashIcon } from "../assets/Icons/Svg";

const SingleCustomerRow = ({ item, handleActions }) => {
  const {
    id,
    customer_type,
    name,
    contact_person,
    contact_details,
    address,
    order_history,
  } = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">{id}</td>
      <td className="py-2 px-4 border">{customer_type}</td>
      <td className="py-2 px-4 border">{name}</td>
      <td className="py-2 px-4 border">{contact_person}</td>
      <td className="py-2 px-4 border">{contact_details}</td>
      <td className="py-2 px-4 border">{address}</td>
      <td className="py-2 px-4 border">{order_history}</td>
      <td className="py-2 px-4 border">
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

export default SingleCustomerRow;
