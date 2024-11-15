import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../constant";
import { editIcon, imageUploadIcon, trashIcon } from "../../assets/Icons/Svg";
import { createPreview, renderSerialNumber } from "../../utils/helpers";
import ImageUploadSection from "../../Form Fields/ImageUploadSection";

const SingleCategoryRow = ({
  item,
  currentPage,
  index,
  handleActions,
  // setFile,
  // file,
}) => {
  console.log(item, "this is data");
  const { name, description, id, slug, product_count, category_image } = item;
  const [rowFile, setRowFile] = useState(null);
  useEffect(() => {
    // if (category_image) {
    //   setRowFile({ preview: createPreview(category_image), file: null });
    // } else {
    //   setRowFile({ preview: null, file: null });
    // }
  }, [category_image]);
  return (
    <tr className="text-center">
      {/* <td className="py-2 px-4 border">
        {renderSerialNumber(currentPage, ITEMS_PER_PAGE, index)}
      </td> */}
      <td>
        {/* {rowFile && (
          <ImageUploadSection
            file={rowFile}
            setFile={setRowFile}
            uniqueId={id}
          />
        )} */}
        {imageUploadIcon}
      </td>
      <td className="py-2 px-4 border">{name}</td>
      <td className="py-2 px-4 border">{slug}</td>
      <td className="py-2 px-4 border">{description}</td>
      <td className="py-2 px-4 border">{product_count}</td>
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
