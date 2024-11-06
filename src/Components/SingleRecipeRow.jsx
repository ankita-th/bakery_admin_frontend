import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { formatDate, renderSerialNumber } from "../utils/helpers";
import { RAW_MATERIALS_ITEMS_PER_PAGE, YYYY_MM_DD } from "../constant";

const SingleRecipeRow = ({ item, currentPage, index, handleActions }) => {
  // values in the figma name, id, quantity, reorder level, expiration date, last updated, notes:
  const { id } = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border"></td>

      {/* <td className="py-2 px-4 border">
        {renderSerialNumber(currentPage, RAW_MATERIALS_ITEMS_PER_PAGE, index)}
      </td> */}

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
          onClick={() => handleActions({ action: "delete", delete_id: id })}
          className="text-red-500 hover:text-red-700"
        >
          {trashIcon}
        </button>
      </td>
    </tr>
  );
};

export default SingleRecipeRow;
