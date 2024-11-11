import React from "react";
import { ITEMS_PER_PAGE } from "../../constant";
import { editIcon, trashIcon } from "../../assets/Icons/Svg";
import { renderSerialNumber } from "../../utils/helpers";

const SingleCategoryRow = ({ item, currentPage, index, handleActions }) => {
  console.log(item, "this is data");
  const { name, description, id, slug } = item;
  // const {name, description, product_category, slug} = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">
        {renderSerialNumber(currentPage, ITEMS_PER_PAGE, index)}
      </td>
      <td className="py-2 px-4 border">{name}</td>
      <td className="py-2 px-4 border">{slug}</td>
      <td className="py-2 px-4 border">{description}</td>
      <td className="py-2 px-4 border"></td>
      <td className="py-2 px-4 border space-x-2">
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

export default SingleCategoryRow;
