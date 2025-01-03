import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { formatDate, renderSerialNumber } from "../utils/helpers";
import { RAW_MATERIALS_ITEMS_PER_PAGE, YYYY_MM_DD } from "../constant";
import Checkbox from "./Common/Checkbox";

const SingleRawMaterialRow = ({
  item,
  handleActions,
  selectedMaterials,
  handleSelectMaterials,
}) => {
  const {
    id,
    name,
    quantity,
    reorder,
    description,
    expiry_date,
    unit_of_measure,
    updated_at,
    product_count,
  } = item;
  return (
    <tr className=" border border-gray-400 ">
      <td className="text-center rounded-tl-[10px] rounded-bl-[10px] ">
        <Checkbox
          checked={selectedMaterials?.includes(id)}
          onClick={() => {
            handleSelectMaterials(id);
          }}
        />
      </td>
      {/* <td className="py-2 px-4">
        {renderSerialNumber(currentPage, RAW_MATERIALS_ITEMS_PER_PAGE, index)}
      </td> */}
      <td className="py-2 px-4">{id}</td>

      <td className="py-2 text-nowrap">{name}</td>
      <td className="py-2 px-4 text-nowrap">{`${quantity} ${unit_of_measure}`}</td>
      <td
        className={`py-2 px-4 ${
          // update required: Update this logic
          // reorder >= 50 && "text-green-500"
          "text-green-500"
        }`}
      >
        {reorder}
      </td>
      <td className="py-2 px-4">{formatDate(expiry_date, YYYY_MM_DD)}</td>
      <td className="py-2">{formatDate(updated_at, YYYY_MM_DD)}</td>
      <td className="py-2 px-4 text-nowrap">{description}</td>
      <td className="py-2 px-4 flex gap-4">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions({ action: "view", viewItem: item })}
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
