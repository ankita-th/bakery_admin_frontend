import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { renderSerialNumber } from "../utils/helpers";
import { RAW_MATERIALS_ITEMS_PER_PAGE } from "../constant";

const SingleRawMaterialRow = ({ item, currentPage, index, handleActions }) => {
  // values in the figma name, id, quantity, reorder level, expiration date, last updated, notes:
  const { name, quantity, reorder, description, id } = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border"></td>

      {/* <td className="py-2 px-4 border">
        {renderSerialNumber(currentPage, RAW_MATERIALS_ITEMS_PER_PAGE, index)}
      </td> */}
      <td className="py-2 px-4 border">{id}</td>

      <td className="py-2 px-4 border">{name}</td>
      <td className="py-2 px-4 border">{quantity}</td>
      <td
        className={`py-2 px-4 border ${
          // update required: Update this logic
          reorder >= 50 && "text-green-500"
        }`}
      >
        {reorder}
      </td>
      <td className="py-2 px-4 border">expirationDate</td>
      <td className="py-2 px-4 border">lastUpdated</td>
      <td className="py-2 px-4 border">Notes</td>

      <td className="py-2 px-4 border space-x-2">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions({ action: "view" })}
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
