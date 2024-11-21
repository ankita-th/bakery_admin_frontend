import React from "react";
const STATUS_TO_TEXT = {
  AVAILABLE: "Available",
  in_stock:"In Stock"
};
const STATUS_TO_CLASS = {
  AVAILABLE: "status-available",
};

const SingleInventoryRow = ({ item }) => {
  const { id, name, sku, reorder, barcode_no, quantity,current_stock,status } = item;
  return (
    <tr>
      <td className="py-2 px-4 border-0 bg-white ">{name}</td>
      <td className="py-2 px-4 border-0 bg-white ">{current_stock}</td>
      <td className="py-2 px-4 border-0 bg-white ">{reorder}</td>
      <td className="py-2 px-4 border-0 bg-white ">{barcode_no}</td>
      <td className="py-2 px-4 border-0 bg-white ">{sku}</td>
      <td
        className={`py-2 px-4 border-0 bg-white ${STATUS_TO_CLASS?.[status]}`}
      >
        {STATUS_TO_TEXT?.[status]}
      </td>
      <td className="py-2 px-4 border-0 bg-white ">Restock</td>
    </tr>
  );
};

export default SingleInventoryRow;
