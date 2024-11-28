import React from "react";
import { editIcon, trashIcon } from "../assets/Icons/Svg";
import { createName } from "../utils/helpers";
const STATUS_TO_CLASS = {
  true: "text-green-500",
  false: "text-red-500",
};

const SingleEmployeeRow = ({ item, handleActions, index, currentPage }) => {
  // update required : update the keys according to the api and list accordingly here
  const {
    id,
    first_name,
    last_name,
    role,
    email,
    phone,
    shift,
    status,
    is_active,
    employee_detail
  } = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">{id}</td>
      <td className="py-2 px-4 border text-nowrap">{createName(first_name, last_name)}</td>
      <td className="py-2 px-4 border">{role}</td>
      <td className="py-2 px-4 border">{email}</td>
      <td className="py-2 px-4 border">{employee_detail?.contact_no}</td>
      <td className="py-2 px-4 border">{employee_detail?.shift}</td>
      {/* update required: add css for active-status and inactive-status class */}
      <td className={`py-2 px-4 border ${STATUS_TO_CLASS[is_active]}`}>
        {is_active ? "Active" : "Inactive"}
      </td>

      <td className="py-2 px-4 border space-x-2 flex">
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
            handleActions({ action: "delete", deleteId: id });
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
