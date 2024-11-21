import React from "react";
import { editIcon, eyeIcon, printIcon, trashIcon } from "../assets/Icons/Svg";
import {
  formatDate,
  listCategories,
  renderSerialNumber,
} from "../utils/helpers";
import { RAW_MATERIALS_ITEMS_PER_PAGE, YYYY_MM_DD } from "../constant";
const STATUS_TO_TEXT = {
  true: "Published",
  false: "Draft",
};
const STATUS_TO_CLASS = {
  true: "text-green-500",
  false: "text-red-500",
};
const SingleRecipeRow = ({
  item,
  currentPage,
  index,
  handleActions,
  isRecipe = false,
}) => {
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
      <td className="py-2 px-4 border"></td>
      <td className="py-2 px-4 border">{recipe_title}</td>
      <td className="py-2 px-4 border">{listCategories(category)}</td>
      {/* update required :need to confirm about this mins and hours query */}
      <td className="py-2 px-4 border">{preparation_time} mins</td>
      <td className="py-2 px-4 border">{cook_time} mins</td>
      <td className="py-2 px-4 border">{serving_size} servings</td>
      <td className={`py-2 px-4 border ${STATUS_TO_CLASS?.[status]}`}>
        {STATUS_TO_TEXT?.[status]}
      </td>

      <td className="py-2 px-4 border space-x-2">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions({ action: "view" })}
        >
          {isRecipe ? printIcon : eyeIcon}
        </button>
        <button
          onClick={() => handleActions({ action: "edit", id: id })}
          className="text-blue-500 hover:text-blue-700"
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
