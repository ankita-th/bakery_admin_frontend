import React from "react";
import { editIcon, trashIcon } from "../assets/Icons/Svg";

const STATUS_TO_TEXT = {
  AVAILABLE: "Available",
  OUT_OF_STOCK: "Out Of Stock",
};
const STATUS_TO_CLASS = {
  AVAILABLE: "status-available",
};

const SingleInventoryRow = ({ item, handleActions }) => {
  const { id, name, sku, reorder, barcode, quantity, status } = item;
  return (
    <tr>
      <td className="py-2 px-4 border-0 bg-white ">{name}</td>
      <td className="py-2 px-4 border-0 bg-white ">{quantity}</td>
      <td className="py-2 px-4 border-0 bg-white ">{reorder}</td>
      <td className="py-2 px-4 border-0 bg-white ">{barcode}</td>
      <td className="py-2 px-4 border-0 bg-white ">{sku}</td>
      <td
        className={`py-2 px-4 border-0 bg-white ${STATUS_TO_CLASS?.[status]}`}
      >
        {STATUS_TO_TEXT?.[status]}
      </td>
      <td className="py-2 px-4 border-0 bg-white ">
        {reorder >= 100 ? (
          <button
            onClick={() => handleActions({ action: "edit", editItem: item })}
            className="orange_btn"
          >
            Restock
          </button>
        ) : (
          <>
            <button disabled={true} className="orange_btn">
              None
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default SingleInventoryRow;
