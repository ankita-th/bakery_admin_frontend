import React, { Fragment, useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../constant";
import { editIcon, imageUploadIcon, trashIcon } from "../../assets/Icons/Svg";
import { createPreview, renderSerialNumber } from "../../utils/helpers";
import ImageUploadSection from "../../Form Fields/ImageUploadSection";
import Checkbox from "./Checkbox";

const SingleCategoryRow = ({
  item,
  currentPage,
  index,
  handleActions,
  handleSelectedCategories,
  selectedItems,
  handleSelectItems,
  // setFile,
  // file,
}) => {
  const {
    name,
    description,
    id,
    slug,
    product_count,
    category_image,
    subcategories,
  } = item;
  const { categories, subCategories } = selectedItems;
  return (
    <>
      <tr className="text-center">
        <td className="text-center rounded-tl-[10px] rounded-bl-[10px] ">
          <Checkbox
            checked={categories?.includes(id)}
            onClick={() => {
              handleSelectItems(id, "category");
            }}
          />
        </td>
        <td>
          {category_image ? (
            <div className="image-display">
              <img
                src={createPreview(category_image)}
                className="w-[30px] h-[30px] object-cover rounded-2"
              />
            </div>
          ) : (
            imageUploadIcon
          )}
        </td>
        <td className="py-2 px-4 border">{name}</td>
        <td className="py-2 px-4 border">{slug}</td>
        <td className="py-2 px-4 border">{description}</td>
        <td className="py-2 px-4 border">{product_count}</td>
        <td className="py-2 px-4 border space-x-2">
          <button
            onClick={() =>
              handleActions({
                action: "edit",
                editItem: item,
                type: "category",
              })
            }
            className="text-blue-500 hover:text-blue-700"
          >
            {editIcon}
          </button>
          <button
            onClick={() =>
              handleActions({
                action: "delete",
                deleteId: id,
                type: "category",
              })
            }
            className="text-red-500 hover:text-red-700"
          >
            {trashIcon}
          </button>
        </td>
      </tr>

      {/* for listing subcategories */}
      {subcategories?.length > 0
        ? subcategories.map((subCategory, subCategoryIndex) => (
            <Fragment key={subCategoryIndex}>
              <tr className="text-center">
                <td className="text-center rounded-tl-[10px] rounded-bl-[10px]">
                  <Checkbox
                    checked={subCategories?.includes(subCategory?.id)}
                    onClick={() => {
                      handleSelectItems(subCategory?.id, "subcategory");
                    }}
                  />
                </td>
                <td>
                  {subCategory?.category_image ? (
                    <div className="image-display">
                      <img
                        src={createPreview(subCategory?.category_image)}
                        className="w-[30px] h-[30px] object-cover rounded-2"
                      />
                    </div>
                  ) : (
                    imageUploadIcon
                  )}
                </td>
                <td className="py-2 px-4 border"> • {subCategory?.name}</td>
                <td className="py-2 px-4 border">{subCategory?.slug}</td>
                <td className="py-2 px-4 border">{subCategory?.description}</td>
                <td className="py-2 px-4 border">
                  {subCategory?.product_count}
                </td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() =>
                      handleActions({
                        action: "edit",
                        editItem: subCategory,
                        type: "subcategory",
                      })
                    }
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {editIcon}
                  </button>
                  <button
                    onClick={() =>
                      handleActions({
                        action: "delete",
                        deleteId: subCategory?.id,
                        type: "subcategory",
                      })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    {trashIcon}
                  </button>
                </td>
              </tr>
            </Fragment>
          ))
        : ""}
    </>
  );
};

export default SingleCategoryRow;
const data = [
  {
    name: "sadasdsa",
    description: "sasdasdasd",
    id: 3,
    slug: "sdfsf",
    product_count: 23,
    category_image: "/isdfkdfdsmkfsf",
    subCategories: [
      {
        name: "sadasdsa",
        description: "sasdasdasd",
        id: 3,
        slug: "sdfsf",
        product_count: 23,
        category_image: "/isdfkdfdsmkfsf",
      },
    ],
  },
];
