import React from "react";
import { trashIcon } from "../assets/Icons/Svg";
import CommonButton from "../Components/Common/CommonButton";

const DeleteConfirmationModal = ({
  icon = trashIcon,
  title,
  description,
  onDelete,
  onCancel,
  loader,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <div className="flex justify-center">
          <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-900 mt-4">
          {title}
        </h2>
        <p className="text-sm text-center text-gray-600 mt-2">{description}</p>
        <div className="flex justify-center mt-6 space-x-3">
          <CommonButton
            text="Delete"
            onClick={onDelete}
            type="button"
            className="buttonTwo"
            disabled={loader}
            loader={loader}
          />
          {/* <button className="buttonTwo" onClick={onDelete}>
            Delete
          </button> */}
          <CommonButton
            text="Cancel"
            onClick={onCancel}
            type="button"
            className="buttonOne"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
