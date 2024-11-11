import React from "react";
import CommonButton from "./Common/CommonButton";
import { editIcon, trashIcon } from "../assets/Icons/Svg";

const SingleEmployeeRow = ({ item, handleActions, index, currentPage }) => {
  // update required : update the keys according to the api and list accordingly here
  const { id, name, role, email, phone, shift, status } = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">{id}</td>
      <td className="py-2 px-4 border">{name}</td>
      <td className="py-2 px-4 border">{role}</td>
      <td className="py-2 px-4 border">{email}</td>
      <td className="py-2 px-4 border">{phone}</td>
      <td className="py-2 px-4 border">{shift}</td>
      {/* update required: add css for active-status and inactive-status class */}
      <td
        className={`py-2 px-4 border ${
          status ? "active-status" : "inactive-status"
        }`}
      >
        {status ? "Active" : "Inactive"}
      </td>

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
            // need to confirm about id or task id
            // update this accordingly
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

export default SingleEmployeeRow;
