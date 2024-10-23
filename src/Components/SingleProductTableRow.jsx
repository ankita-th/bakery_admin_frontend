import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { renderSerialNumber } from "../utils/helpers";
import { PRODUCTS_ITEMS_PER_PAGE } from "../constant";

const SingleProductRow = ({ data, currentPage, index,handleActions }) => {
    // updates required: price published status in date,date are not given and also category is in number
  const { id, category, name, sku, status, is_active } = data;

  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">
        {renderSerialNumber(currentPage, PRODUCTS_ITEMS_PER_PAGE, index)}
      </td>
      <td className="py-2 px-4 border">{name}</td>
      <td className="py-2 px-4 border">{sku}</td>
      <td
        className={`py-2 px-4 border ${
          status === "available" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </td>
      <td className="py-2 px-4 border">$Product Price</td>
      <td className="py-2 px-4 border">{category}</td>
      <td className="py-2 px-4 border">Product Date</td>
      <td
        className={`py-2 px-4 border ${
          true === "Published" ? "text-green-500" : "text-gray-500"
        }`}
      >
        Product Status
      </td>
      <td className="py-2 px-4 border space-x-2">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions("view")}
        >
          {eyeIcon}
        </button>
        <button
          onClick={() => handleActions("edit", id)}
          className="text-blue-500 hover:text-blue-700"
        >
          {editIcon}
        </button>
        <button
          onClick={() => handleActions("delete", id)}
          className="text-red-500 hover:text-red-700"
        >
          {trashIcon}
        </button>
      </td>
    </tr>
  );
};

export default SingleProductRow;
