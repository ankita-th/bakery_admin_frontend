import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { renderSerialNumber } from "../utils/helpers";
import { ITEMS_PER_PAGE } from "../constant";

const SingleProductRow = ({ data, currentPage, index, handleActions }) => {
  // updates required: price published status in date,date are not given and also category is in number
  const { id, category, name, product_detail, status, is_active } = data;

  return (
    <tr className="text-center border">
      <td>
        <input
          type="checkbox"
          id="checkbox"
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </td>
      <td className="py-2 px-4 border-0">
        {renderSerialNumber(currentPage, ITEMS_PER_PAGE, index)}
      </td>
      <td className="py-2 px-4 border-0">{name}</td>
      <td className="py-2 px-4 border-0">{product_detail?.inventory?.sku}</td>
      <td
        className={`py-2 px-4 border-0 ${
          status === "available" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </td>
      <td className="py-2 px-4 border-0">{`$ ${product_detail?.inventory?.sale_price}`}</td>
      <td className="py-2 px-4 border-0">{category}</td>
      <td className="py-2 px-4 border-0">Product Date</td>
      <td
        className={`py-2 px-4 border-0 ${
          true === "Published" ? "text-green-500" : "text-gray-500"
        }`}
      >
        Product Status
      </td>
      <td className="py-2 px-4 border-0 space-x-2">
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
