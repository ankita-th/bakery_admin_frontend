import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { renderSerialNumber } from "../utils/helpers";
import { ITEMS_PER_PAGE } from "../constant";

const SingleConfigurationRow = ({
  item,
  currentPage,
  index,
  handleActions,
}) => {
  // updates required: price published status in date,date are not given and also category is in number
  const {
    id,
    delivery_availability,
    zip_code,
    min_order_quantity,
    notes,
    location,
    delivery_threshold,
  } = item;

  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">
        {renderSerialNumber(currentPage, ITEMS_PER_PAGE, index)}
      </td>
      <td className="py-2 px-4 border">{zip_code}</td>
      <td className="py-2 px-4 border">{location}</td>
      <td className="py-2 px-4 border">{min_order_quantity}</td>
      <td
        className={`py-2 capitalize px-4 border ${
          delivery_availability === "available"
            ? "text-[#28A745]"
            : "text-[#DC3545]"
        }`}
      >
        {delivery_availability}
      </td>
      <td className="py-2 px-4 border">${delivery_threshold}</td>
      <td className="py-2 px-4 border space-x-2">
        {/* <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions("view")}
        >
          {eyeIcon}
        </button> */}
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

export default SingleConfigurationRow;
