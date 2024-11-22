import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { formatDate, renderSerialNumber } from "../utils/helpers";
import { RAW_MATERIALS_ITEMS_PER_PAGE, YYYY_MM_DD } from "../constant";

const SingleRawMaterialRow = ({ item, currentPage, index, handleActions }) => {
  // values in the figma name, id, quantity, reorder level, expiration date, last updated, notes:
  const {
    id,
    name,
    quantity,
    reorder,
    description,
    expiry_date,
    unit_of_measure,
    updated_at,
    product_count,
  } = item;
  return (
    <tr className=" border border-gray-400 ">
      <td className="py-2 px-4"></td>
      
      {/* <td className="py-2 px-4">
        {renderSerialNumber(currentPage, RAW_MATERIALS_ITEMS_PER_PAGE, index)}
      </td> */}
      <td className="py-2 px-4">{id}</td>

      <td className="py-2 px-4">{name}</td>
      <td className="py-2 px-4">{`${quantity} ${unit_of_measure}`}</td>
      <td
        className={`py-2 px-4 ${
          // update required: Update this logic
          // reorder >= 50 && "text-green-500"
          "text-green-500"
        }`}
      >
        {reorder}
      </td>
      <td className="py-2 px-4">{formatDate(expiry_date, YYYY_MM_DD)}</td>
      <td className="py-2 px-4">{formatDate(updated_at, YYYY_MM_DD)}</td>
      <td className="py-2 px-4">{description}</td>
      <td className="py-2 px-4 space-x-2">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions({ action: "view", viewItem: item })}
        >
          {eyeIcon}
        </button>
        <button
          onClick={() => handleActions({ action: "edit", editItem: item })}
          className="text-blue-500 hover:text-blue-700"
        >
          {editIcon}
        </button>
        <button
          onClick={() => handleActions({ action: "delete", deleteId: id })}
          className="text-red-500 hover:text-red-700"
        >
          {trashIcon}
        </button>
      </td>
    </tr>
  );
};

export default SingleRawMaterialRow;
