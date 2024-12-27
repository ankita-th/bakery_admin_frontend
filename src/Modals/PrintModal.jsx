import React from "react";
import {
  closeIcon,
  deleteIcon,
  downloadIcon,
  printIcon,
  trashIcon,
} from "../assets/Icons/Svg";
import CommonButton from "../Components/Common/CommonButton";
import CommonTextField from "../Form Fields/CommonTextField";
import { useForm } from "react-hook-form";

const PrintModal = ({ onCancel, onRecipeSubmit, printLoaders }) => {
  const formConfig = useForm();
  const { handleSubmit } = formConfig;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-10 w-full shadow-lg w-full max-w-[800px] delete_modal relative">
        <form onSubmit={handleSubmit(onRecipeSubmit)}>
          <div className="flex justify-center">
            {/* <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center"></div> */}
          </div>
          <h2 className="text-lg font-semibold text-center text-gray-900 mt-4">
            {" "}
            Adjust Recipe Quantity{" "}
          </h2>
          <CommonTextField
            fieldName="quantity"
            rules={{ required: "Quantity is required" }}
            label="Quantity *"
            formConfig={formConfig}
            isNumberOnly={true}
          />
          <p className="text-sm text-center text-gray-600 mt-2"></p>
          <div className="flex justify-center mt-6 space-x-3">
            <CommonButton
              text="Download"
              type="submit"
              name="download"
              className="orange_btn print_button"
              loader={printLoaders?.download}
              icon={downloadIcon}
            />
            <CommonButton
              text="Print"
              type="submit"
              className="orange_btn print_button"
              name="print"
              loader={printLoaders?.print}
              icon={printIcon}
            />
            {/* <button className="orange_btn" onClick={onDelete}>
            Delete
          </button> */}
            <CommonButton
              //   text="Cancel"
              icon={closeIcon}
              type="button"
              className="print_close_icon"
              onClick={onCancel}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrintModal;
