import React from "react";
import { editIcon, trashIcon } from "../assets/Icons/Svg";
import { combineBarcode } from "../utils/helpers";

const STATUS_TO_TEXT = {
  AVAILABLE: "Available",
  in_stock: "In Stock",
};
const STATUS_TO_CLASS = {
  AVAILABLE: "status-available",
};

const SingleInventoryRow = ({ item,handleActions }) => {
  const {
    id,
    name,
    sku,
    reorder,
    barcode_no,
    quantity,
    current_stock,
    status,
    barcode_to
  } = item;
  return (
    <tr>
      <td className="py-2 px-4 border-0 bg-white ">{name}</td>
      <td className="py-2 px-4 border-0 bg-white ">{current_stock}</td>
      <td className="py-2 px-4 border-0 bg-white ">{reorder}</td>
      <td className="py-2 px-4 border-0 bg-white ">{combineBarcode(barcode_no,barcode_to)}</td>
      <td className="py-2 px-4 border-0 bg-white ">{sku}</td>
      <td
        className={`py-2 px-4 border-0 bg-white ${STATUS_TO_CLASS?.[status]}`}
      >
        {STATUS_TO_TEXT?.[status]}
      </td>
      <td className="py-2 px-4 border-0 bg-white ">
        {!STATUS_TO_TEXT?.[status] ? (
          "Restock"
        ) : (
          <>
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
          </>
        )}
      </td>
    </tr>
  );
};

export default SingleInventoryRow;
