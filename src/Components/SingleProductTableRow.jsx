import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { listCategories, renderSerialNumber } from "../utils/helpers";
import { ITEMS_PER_PAGE } from "../constant";
import Checkbox from "./Common/Checkbox";

const SingleProductTableRow = ({
  data,
  currentPage,
  index,
  handleActions,
  selectedProducts,
  handleSelectProduct,
}) => {
  console.log(selectedProducts, "selectedProducts");
  // updates required: price published status in date,date are not given and also category is in number
  const { id, name, product_detail, category, status } = data;

  return (
    <tr className=" border border-gray-400 ">
      <td className="text-center rounded-tl-[10px] rounded-bl-[10px] bg-white ">
        <Checkbox
          checked={selectedProducts?.includes(id)}
          onClick={() => {
            handleSelectProduct(id)
          }}
        />
      </td>
      <td className="py-2 px-4 border-0 bg-white ">
        {renderSerialNumber(currentPage, ITEMS_PER_PAGE, index)}
      </td>
      <td className="py-2 px-4 border-0 bg-white text-nowrap">{name}</td>
      <td className="py-2 px-4 border-0 bg-white text-nowrap">
        {product_detail?.inventory?.sku}
      </td>
      <td
        className={`py-2 px-4 border-0 bg-white  ${
          status === "available" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </td>
      <td className="py-2 px-4 border-0 bg-white text-nowrap">
        {product_detail?.inventory?.regular_price}
      </td>
      <td className="py-2 px-4 border-0 bg-white text-nowrap">
        {listCategories(category)}
      </td>
      <td className="py-2 px-4 border-0 bg-white">21/10/2024</td>
      {/* <td
        className={`py-2 px-4 border-0 bg-white  ${
          status === "available" ? "text-green-500" : "text-gray-500"
        }`}
      >
        {status}
      </td> */}
      <td className="py-2 px-4 border-0 space-x-2 bg-white rounded-tr-[10px] rounded-br-[10px] flex">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions("view", id)}
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

export default SingleProductTableRow;
