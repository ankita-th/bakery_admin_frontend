import React from "react";
import { editIcon, trashIcon } from "../assets/Icons/Svg";
import { listCategories } from "../utils/helpers";
import Checkbox from "./Common/Checkbox";
const STATUS_TO_TEXT = {
  true: "Published",
  false: "Draft",
};
const STATUS_TO_CLASS = {
  true: "text-green-500",
  false: "text-red-500",
};
const SingleRecipeRow = ({ item, handleActions }) => {
  // values in the figma name, id, quantity, reorder level, expiration date, last updated, notes:
  const {
    id,
    recipe_title,
    category,
    cook_time,
    preparation_time,
    serving_size,
    status,
  } = item;
  return (
    <tr className="text-center">
      <td className="py-2 px-4 border">
        <Checkbox />
      </td>
      <td className="py-2 px-4 border text-nowrap">{recipe_title}</td>
      <td className="py-2 px-4 border text-nowrap">
        {listCategories(category)}
      </td>
      {/* update required :need to confirm about this mins and hours query */}
      <td className="py-2 px-4 border text-nowrap">{preparation_time} mins</td>
      <td className="py-2 px-4 border text-nowrap">{cook_time} mins</td>
      <td className="py-2 px-4 border text-nowrap">{serving_size} servings</td>
      <td
        className={`py-2 px-4 border text-nowrap ${STATUS_TO_CLASS?.[status]}`}
      >
        {STATUS_TO_TEXT?.[status]}
      </td>

      <td className="py-2 px-4 border space-x-2 flex text-nowrap">
        {/* uncomment this  */}
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions({ action: "view" })}
        >
          {isRecipe ? printIcon : eyeIcon}
        </button>
        <button
          onClick={() => handleActions({ action: "edit", id: id })}
          className="text-blue-500 hover:text-blue-700 "
        >
          {editIcon}
        </button>
        <button
          onClick={() => handleActions({ action: "delete", id: id })}
          className="text-red-500 hover:text-red-700"
        >
          {trashIcon}
        </button>
      </td>
    </tr>
  );
};

export default SingleRecipeRow;
